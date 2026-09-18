import { createContext } from "react";
import type { InputAction, InputState, ModalType, Task } from "./types";

type ModalContextType = {
  modalOpen: ModalType;
  setModalOpen: (modalOpen: ModalType) => void;
  closeModal: () => void;
  inputState: InputState;
  inputDispatch: (action: InputAction) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

type TasksContextType = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (inputState: InputState) => void;
  editTask: (id: string, inputState: InputState) => void;
  deleteTask: (id: string) => void;
};

export const TasksContext = createContext<TasksContextType | null>(null);