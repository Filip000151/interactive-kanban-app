import { createContext, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { DropIndicator, InputAction, InputState, ModalType, Status, Task } from "./types";

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
  setTasks: Dispatch<SetStateAction<Task[]>>;
  addTask: (inputState: InputState) => void;
  editTask: (id: string, inputState: InputState) => void;
  deleteTask: (id: string) => void;
  normalizeOrder: (tasks: Task[]) => Task[];
};

export const TasksContext = createContext<TasksContextType | null>(null);

type DragContextType = {
  cardRefs: RefObject<Map<string, HTMLDivElement>>;
  columnRefs: Record<Status, RefObject<HTMLDivElement | null>>;
  dropIndicator: DropIndicator | null;
  setDropIndicator: Dispatch<SetStateAction<DropIndicator | null>>;
  draggedTaskId: string | null;
  setDraggedTaskId: Dispatch<SetStateAction<string | null>>;
};

export const DragContext = createContext<DragContextType | null>(null);