import { Fragment, type FC, type RefObject } from "react";
import type { Status, Task } from "../shared/types";
import Card from "./Card";
import { AnimatePresence, motion } from "motion/react";
import { useDrag } from "../shared/hooks";

type ColumnProps = {
  type: Status;
  tasks: Task[];
  columnRef: RefObject<HTMLDivElement | null>;
}

const columnConfig: Record<Status, {
  label: string;
  primaryColor: string;
  secondaryColor: string;
  accent: string;
}> = {
  toDo: {
    label: 'To Do',
    primaryColor: 'slate-100',
    secondaryColor: 'slate-400',
    accent: 'slate-800'
  },
  inProgress: {
    label: 'In Progress',
    primaryColor: 'blue-100',
    secondaryColor: 'blue-400',
    accent: 'blue-800'
  },
  done: {
    label: 'Done',
    primaryColor: 'green-100',
    secondaryColor: 'green-400',
    accent: 'green-800'
  }
};

const Column: FC<ColumnProps> = ({ type, tasks, columnRef }) => {
  const config = columnConfig[type];
  const {dropIndicator} = useDrag();
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`relative rounded-lg bg-${config.primaryColor} w-100 shadow gap-5`}
      ref={columnRef}
    >
      <h2 className={`text-3xl font-bold text-${config.accent} bg-${config.secondaryColor} w-full p-4 text-center rounded-t-lg select-none`}>{config.label}</h2>
      <div
        className="flex flex-col items-center mt-10 gap-5 p-4 min-h-120"

      >
        <AnimatePresence mode="popLayout">
          {tasks.map(task => (
            <Fragment key={task.id}>
              {(dropIndicator?.id === task.id && dropIndicator.position === 'before') && (
                <motion.div 
                  initial={{opacity: 0}} 
                  animate={{opacity: 1}} 
                  exit={{opacity: 0}} 
                  className="w-30 h-10 border-2 border-dotted border-gray-800" 
                />
              )}
              <Card
                task={task}
                bg={config.secondaryColor}
                color={config.accent}
              />
              {(dropIndicator?.id === task.id && dropIndicator.position === 'after') && (
                <motion.div 
                  initial={{opacity: 0}} 
                  animate={{opacity: 1}} 
                  exit={{opacity: 0}} 
                  className="w-30 h-10 border-2 border-dotted border-gray-800" 
                />
              )}
            </Fragment>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Column
