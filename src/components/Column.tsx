import { type FC, type RefObject } from "react";
import type { Status, Task } from "../shared/types";
import Card from "./Card";
import { AnimatePresence, motion } from "motion/react";

type ColumnProps = {
  type: Status;
  tasks: Task[];
  columnRef: RefObject<HTMLDivElement | null>;
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

const Column: FC<ColumnProps> = ({ type, tasks, columnRef }) => {
  const config = columnConfig[type];
  return (
    <motion.div
      initial={{scale: 0}}
      animate={{scale: 1}}
      className={`rounded-lg ${config.bg} w-100 shadow gap-5 overflow-hidden`}
      ref={columnRef}
    >
      <h2 className={`text-3xl font-bold ${config.color} ${config.accent} w-full p-4 text-center`}>{config.label}</h2>
      <div
        className="flex flex-col items-center mt-10 gap-5 p-4 min-h-120"
        
      >
        <AnimatePresence mode="popLayout">
          {tasks.map(task => (
            <Card
              key={task.id}
              task={task}
              bg={config.accent}
              color={config.color}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Column
