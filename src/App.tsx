import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: 'toDo' | 'inProgress' | 'done';
  order: number;
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div>
      
    </div>
  )
}

export default App
