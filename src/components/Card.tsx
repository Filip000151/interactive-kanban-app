import type { FC } from "react"
import type { Task } from "../shared/types"
import { useModal, useTasks } from "../shared/hooks";
import Modal from "./Modal";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type CardProps = {
  task: Task;
  bg: string;
  color: string;
};

const Card: FC<CardProps> = ({ task, bg, color }) => {
  const { modalOpen, setModalOpen, inputDispatch, inputState, closeModal } = useModal();
  const {editTask, deleteTask} = useTasks();
  return (
    <>
      <div
        onClick={() => setModalOpen(task.id)}
        key={task.id}
        className={`w-40 text-center ${bg} shadow-lg p-4 rounded select-none ${color} font-semibold`}
      >
        {task.title}
      </div>
      {modalOpen === task.id && (
        <Modal bg={bg} color={color}>
          <h2 className="font-bold text-2xl my-5">{task.title}</h2>
          <p className="text-lg mb-4">{task.description}</p>
          <div className="flex justify-end gap-3">
            <FaEdit onClick={() => {
              inputDispatch({type: 'setInputs', value: {titleInput: task.title, descriptionInput: task.description}});
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
              onClick={() => {
                editTask(task.id, inputState);
                closeModal();
              }}
              className="bg-green-700 px-4 py-2 rounded text-white"
            >Add</button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Card
