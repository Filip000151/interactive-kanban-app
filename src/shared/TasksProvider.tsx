import { useEffect, useState, type FC, type ReactNode } from "react";
import type { InputState, Task } from "./types";
import { TasksContext } from "./context";



const TasksProvider: FC<{children: ReactNode}> = ({children}) => {
  const [tasks, setTasks] = useState<Task[]>(JSON.parse(localStorage.getItem('tasks')!) || [
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

  const addTask = (inputState: InputState) => {
    setTasks(prev => [...prev, {
      id: crypto.randomUUID(),
      title: inputState.titleInput,
      description: inputState.descriptionInput,
      status: 'toDo',
      order: prev.length
    }]);
  };
  const editTask = (id: string, inputState: InputState) => {
    setTasks(prev => prev.map(
      task => task.id === id 
      ? {...task, title: inputState.titleInput, description: inputState.descriptionInput} 
      : task));
  }
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  return (
    <TasksContext.Provider value={{tasks, setTasks, addTask, editTask, deleteTask}}>
      {children}
    </TasksContext.Provider>
  )
}

export default TasksProvider
