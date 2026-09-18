import { useContext } from "react"
import { ModalContext, TasksContext } from "./context";

export const useModal = () => {
  const context = useContext(ModalContext);

  if(!context){
    throw new Error('useModal hook must be used within a ModalProvider.');
  }

  return context;
}

export const useTasks = () => {
  const context = useContext(TasksContext);

  if(!context){
    throw new Error('useTasks hook must be used within a TasksProvider.');
  }

  return context;
}