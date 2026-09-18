import { createContext } from "react";
import type { InputAction, InputState, ModalType } from "./types";

type ModalContextType = {
  modalOpen: ModalType;
  setModalOpen: (modalOpen: ModalType) => void;
  closeModal: () => void;
  inputState: InputState;
  inputDispatch: (action: InputAction) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);