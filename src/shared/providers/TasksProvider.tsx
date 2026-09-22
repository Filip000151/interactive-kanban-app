import { useEffect, useState, type FC, type ReactNode } from "react";
import type { InputState, Status, Task } from "../types";
import { TasksContext } from "../context";
import { useDrag } from "../hooks";



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

  const {cardRefs} = useDrag();

  const normalizeOrder = (tasks: Task[]) => {
    const byColumn: Record<Status, Task[]> = {
      toDo: [],
      inProgress: [],
      done: []
    };
    tasks.forEach(t => byColumn[t.status].push(t));

    const result: Task[] = [];

    (Object.keys(byColumn) as Status[]).forEach(col => {
      byColumn[col]
        .sort((a, b) => a.order - b.order)
        .forEach((t, i) => result.push({...t, order: i}));
    });

    return result;
  }

  const addTask = (inputState: InputState) => {
    setTasks(prev => normalizeOrder([...prev, {
      id: crypto.randomUUID(),
      title: inputState.titleInput,
      description: inputState.descriptionInput,
      status: 'toDo',
      order: prev.length
    }]));
  };
  const editTask = (id: string, inputState: InputState) => {
    setTasks(prev => normalizeOrder(prev.map(
      task => task.id === id 
      ? {...task, title: inputState.titleInput, description: inputState.descriptionInput} 
      : task)));
  }
  const deleteTask = (id: string) => {
    cardRefs.current.delete(id);
    setTasks(prev => normalizeOrder(prev.filter(task => task.id !== id)));
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  return (
    <TasksContext.Provider value={{tasks, setTasks, addTask, editTask, deleteTask, normalizeOrder}}>
      {children}
    </TasksContext.Provider>
  )
}

export default TasksProvider
