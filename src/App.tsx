import { useMemo } from "react";
import Column from "./components/Column";
import Modal from "./components/Modal";
import { useDrag, useModal, useTasks } from "./shared/hooks";
import { AnimatePresence, motion } from "motion/react";

const App = () => {
  const { modalOpen, setModalOpen, inputState, inputDispatch, closeModal } = useModal();
  const { tasks, addTask } = useTasks();
  const { columnRefs, draggedTaskId } = useDrag();

  const toDoTasks = useMemo(
    () => tasks.filter(t => t.status === 'toDo').sort((a, b) => a.order - b.order),
    [tasks]
  );
  const inProgressTasks = useMemo(
    () => tasks.filter(t => t.status === 'inProgress').sort((a, b) => a.order - b.order),
    [tasks]
  );
  const doneTasks = useMemo(
    () => tasks.filter(t => t.status === 'done').sort((a, b) => a.order - b.order),
    [tasks]
  );

  return (
    <div className="bg-gray-700 min-h-screen text-gray-200 p-4 flex flex-col items-center">
      <button
        onClick={() => setModalOpen('addTask')}
        className="bg-green-500 text-green-900 px-4 py-2 rounded font-semibold"
      >
        Add New Task
      </button>

      <AnimatePresence>
        {draggedTaskId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30" />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen === 'addTask' && (
          <Modal bg="bg-green-500" color='text-green-700'>
            <h2 className="w-full text-center text-3xl font-semibold mt-5 mb-10">New Task</h2>
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
                onClick={() => {
                  addTask(inputState);
                  closeModal();
                }}
                className="bg-green-700 px-4 py-2 rounded text-white"
              >Add</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <div className="w-400 mt-4 rounded-xl flex justify-around p-4">
        <Column columnRef={columnRefs.toDo} type="toDo" tasks={toDoTasks} />
        <Column columnRef={columnRefs.inProgress} type="inProgress" tasks={inProgressTasks} />
        <Column columnRef={columnRefs.done} type="done" tasks={doneTasks} />
      </div>
    </div>
  )
}

export default App
