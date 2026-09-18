import type { FC } from "react";
import type { Status, Task } from "../shared/types";

type ColumnProps = {
  type: Status;
  tasks: Task[];
}

const columnConfig: Record<Status, {
  label: string;
  bg: string;
  accent: string;
  color: string;
}> = {
  toDo: {
    label: 'To Do',
    bg: 'bg-slate-100',
    accent: 'bg-slate-400',
    color: 'text-slate-800'
  },
  inProgress: {
    label: 'In Progress',
    bg: 'bg-blue-100',
    accent: 'bg-blue-400',
    color: 'text-blue-800'
  },
  done: {
    label: 'Done',
    bg: 'bg-green-100',
    accent: 'bg-green-400',
    color: 'text-green-800'
  }
};

const Column: FC<ColumnProps> = ({ type, tasks }) => {
  const config = columnConfig[type];
  return (
    <div className={`rounded-lg ${config.bg} w-100 shadow gap-5 overflow-hidden`}>
      <h2 className={`text-3xl font-bold ${config.color} ${config.accent} w-full p-4 text-center`}>{config.label}</h2>
      <div className="flex flex-col items-center mt-10 gap-5 p-4 min-h-120">
        {tasks.map(task => (
          <div key={task.id} className={`w-40 text-center ${config.accent} shadow-lg p-4 rounded select-none ${config.color} font-semibold`}>
            {task.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Column
