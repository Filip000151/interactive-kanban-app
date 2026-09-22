import { createContext, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { InputAction, InputState, ModalType, Status, Task } from "./types";

type ModalContextType = {
  modalOpen: ModalType;
  setModalOpen: Dispatch<SetStateAction<ModalType>>;
  closeModal: () => void;
  inputState: InputState;
  inputDispatch: (action: InputAction) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

type TasksContextType = {
  tasks: Task[];
  columnRefs: Record<Status, RefObject<HTMLDivElement | null>>;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  addTask: (inputState: InputState) => void;
  editTask: (id: string, inputState: InputState) => void;
  deleteTask: (id: string) => void;
};

export const TasksContext = createContext<TasksContextType | null>(null);