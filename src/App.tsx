import { useState } from "react";
import Column from "./components/Column";
import type { Task } from "./shared/types";
import Modal from "./components/Modal";
import { useModal } from "./shared/hooks";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: crypto.randomUUID(),
      title: 'Learn React',
      description: 'Make some react projects.',
      status: 'toDo',
      order: 1
    },
    {
      id: crypto.randomUUID(),
      title: 'Learn Motion',
      description: 'Practice animations with Motion library.',
      status: 'toDo',
      order: 2
    },
    {
      id: crypto.randomUUID(),
      title: 'Make motion project',
      description: 'Make a kanban app.',
      status: 'toDo',
      order: 3
    }
  ]);

  const {modalOpen, setModalOpen, inputState, inputDispatch, closeModal} = useModal();
  

  const toDoTasks = tasks.filter(task => task.status === 'toDo');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  const addTask = () => {
    setTasks(prev => [...prev, {
      id: crypto.randomUUID(),
      title: inputState.titleInput,
      description: inputState.descriptionInput,
      status: 'toDo',
      order: prev.length
    }]);
    closeModal();
  };

  return (
    <div className="bg-gray-700 min-h-screen text-gray-200 p-4 flex flex-col items-center">
      <button 
        onClick={() => setModalOpen('addTask')} 
        className="bg-green-500 text-green-900 px-4 py-2 rounded font-semibold"
      >
        Add New Task
      </button>

      {modalOpen === 'addTask' && (
        <Modal bg="bg-green-500">
          <h2 className="w-full text-center text-3xl text-green-700 font-semibold mt-5 mb-10">New Task</h2>
          <input
            value={inputState.titleInput}
            onChange={(e) => inputDispatch({type: 'setTitle', value: e.target.value})}
            type="text" 
            placeholder="Enter Task Title" 
            className="bg-white text-black px-2 py-1 rounded focus:outline-none block w-100 mb-5" 
          />
          <textarea 
            value={inputState.descriptionInput}
            onChange={(e) => inputDispatch({type: 'setDescription', value: e.target.value})}
            placeholder="Enter Task Description" 
            className="block bg-white w-100 text-black rounded px-2 py-1 mb-5 focus:outline-none" 
          />
          <div className="flex justify-end">
            <button 
              onClick={() => addTask()} 
              className="bg-green-700 px-4 py-2 rounded text-white"
            >Add</button>
          </div>
        </Modal>
      )}

      <div className="w-400 mt-4 rounded-xl flex justify-around p-4">
        <Column type="toDo" tasks={toDoTasks} />
        <Column type="inProgress" tasks={inProgressTasks} />
        <Column type="done" tasks={doneTasks} />
      </div>
    </div>
  )
}

export default App
