import { type FC } from "react"
import type { Status, Task } from "../shared/types"
import { useDrag, useModal, useTasks } from "../shared/hooks";
import Modal from "./Modal";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineDragIndicator } from "react-icons/md";
import { AnimatePresence, motion, useDragControls, type PanInfo } from "motion/react";

type CardProps = {
  task: Task;
  bg: string;
  color: string;
};

const Card: FC<CardProps> = ({ task, bg, color }) => {
  const { modalOpen, setModalOpen, inputDispatch, inputState, closeModal } = useModal();
  const { tasks, editTask, deleteTask, setTasks } = useTasks();
  const { columnRefs, cardRefs, dropIndicator, setDropIndicator, draggedTaskId, setDraggedTaskId, setHoveredColumn, hoveredColumn } = useDrag();
  const controls = useDragControls();

  const checkIfPointOver = (point: { x: number, y: number }, el: HTMLElement) => {
    const { x, y } = point;
    const rect = el.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  const moveTask = (taskId: string, toColumn: Status, toIndex: number) => {
    const without = tasks.filter(t => t.id !== taskId);
    const columnTasks = without
      .filter(t => t.status === toColumn)
      .sort((a, b) => a.order - b.order);

    columnTasks.splice(toIndex, 0, { ...task, status: toColumn });

    const orders = new Map(columnTasks.map((t, i) => [t.id, i]));

    const result = without.map(t => orders.has(t.id) ? { ...t, order: orders.get(t.id)! } : t);

    const finalTask = columnTasks.find(t => t.id === task.id)!;
    result.push({ ...finalTask, order: orders.get(task.id)! });
    setTasks([...result]);
  };

  const handleDrag = (_: MouseEvent, info: PanInfo) => {
    for (const [id, el] of cardRefs.current) {
      if (id === task.id) continue;

      if (checkIfPointOver(info.point, el)) {
        const hoveredTask = tasks.find(t => t.id === id);
        const isFirst = hoveredTask?.order === 0;
        const rect = el.getBoundingClientRect();
        const intersection = isFirst ? rect.top + rect.height / 2 : rect.top;
        const { y } = info.point;

        setDropIndicator({
          id,
          position: y < intersection ? 'before' : 'after'
        });
        break;
      }
    }

    let columnHover: Status | null = null;
    (Object.keys(columnRefs) as Status[]).forEach(key => {
      const el = columnRefs[key].current!;
      if (checkIfPointOver(info.point, el)) columnHover = key;
    })
    setHoveredColumn(columnHover);
    if(!hoveredColumn) setDropIndicator(null);
  }

  const handleDragEnd = (_: MouseEvent, info: PanInfo) => {
    const targets: { status: Status, el: HTMLDivElement | null }[] = [
      { status: 'toDo', el: columnRefs.toDo.current },
      { status: 'inProgress', el: columnRefs.inProgress.current },
      { status: 'done', el: columnRefs.done.current }
    ];

    const targetColumn = targets.find(
      t => t.el && checkIfPointOver(info.point, t.el)
    )!;

    if (!targetColumn && !dropIndicator) {
      setDraggedTaskId(null);
      return;
    }

    const targetColumnTasks = tasks.filter(t => t.status === targetColumn.status && t.id !== task.id).sort((a, b) => a.order - b.order);

    let targetIndex: number;
    if (dropIndicator) {
      const index = targetColumnTasks.findIndex(t => t.id === dropIndicator.id);
      targetIndex = dropIndicator.position === 'before' ? index : index + 1;
    }
    else
      targetIndex = targetColumnTasks.length;

    setDropIndicator(null);
    setDraggedTaskId(null);
    setHoveredColumn(null);
    moveTask(task.id, targetColumn.status, targetIndex);
  };
  return (
    <>
      <motion.div
        layout
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: modalOpen === task.id || modalOpen === `edit-${task.id}` ? 0 : 1
        }}
        drag
        dragListener={false}
        dragMomentum={false}
        dragControls={controls}
        onDragStart={() => setDraggedTaskId(task.id)}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        dragSnapToOrigin
        whileDrag={{ scale: 1.05, rotate: 5, pointerEvents: 'none', zIndex: 100 }}
        onClick={() => setModalOpen(task.id)}
        className={`w-40 text-center ${bg} shadow-lg p-4 rounded select-none ${color} font-semibold`}
        ref={(el) => {
          if (el) cardRefs.current.set(task.id, el);
        }}
        style={{
          position: draggedTaskId === task.id ? 'absolute' : 'relative'
        }}
      >
        {task.title}
        <MdOutlineDragIndicator
          className="absolute top-2 right-2 cursor-grab"
          size={20}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => controls.start(e)}
        />
      </motion.div>
      <AnimatePresence mode="popLayout">
        {modalOpen === task.id && (
          <Modal bg={bg} color={color}>
            <h2 className="font-bold text-2xl my-5">{task.title}</h2>
            <p className="text-lg mb-4">{task.description}</p>
            <div className="flex justify-end gap-3">
              <FaEdit onClick={() => {
                inputDispatch({ type: 'setInputs', value: { titleInput: task.title, descriptionInput: task.description } });
                setModalOpen(`edit-${task.id}`);
              }} size={32} />
              <MdDelete onClick={() => {
                deleteTask(task.id);
                closeModal();
              }} size={32} />
            </div>
          </Modal>
        )}
        {modalOpen === `edit-${task.id}` && (
          <Modal bg={bg} color={color}>
            <h2 className="w-full text-center text-3xl font-semibold mt-5 mb-10">Edit Task</h2>
            <input
              value={inputState.titleInput}
              onChange={(e) => inputDispatch({ type: 'setTitle', value: e.target.value })}
              type="text"
              placeholder="Enter Task Title"
              className="bg-white text-black px-2 py-1 rounded focus:outline-none block w-100 mb-5"
            />
            <textarea
              value={inputState.descriptionInput}
              onChange={(e) => inputDispatch({ type: 'setDescription', value: e.target.value })}
              placeholder="Enter Task Description"
              className="block bg-white w-100 text-black rounded px-2 py-1 mb-5 focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setModalOpen(task.id)}
                className="bg-gray-700 px-4 py-2 rounded text-white mr-2"
              >Back</button>
              <button
                onClick={() => {
                  editTask(task.id, inputState);
                  closeModal();
                }}
                className="bg-green-700 px-4 py-2 rounded text-white"
              >Edit</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

export default Card
