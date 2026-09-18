import { useContext } from "react"
import { ModalContext } from "./context";

export const useModal = () => {
  const context = useContext(ModalContext);

  if(!context){
    throw new Error('useModal hook must be used within a ModalProvider.');
  }

  return context;
}