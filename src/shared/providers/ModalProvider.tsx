import { useReducer, useState, type FC, type ReactNode } from "react"
import type { InputAction, InputState, ModalType } from "../types"
import { ModalContext } from "../context";

const reducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case 'setTitle':
      return {...state, titleInput: action.value};
    case 'setDescription':
      return {...state, descriptionInput: action.value};
    case 'setInputs':
      return action.value;
    case 'clear':
      return {descriptionInput: '', titleInput: ''};
    default:
      return state;
  }
}

const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState<ModalType>(null);
  const [inputState, inputDispatch] = useReducer(reducer, { titleInput: '', descriptionInput: '' });
  const closeModal = () => {
    setModalOpen(null);
    inputDispatch({type: 'clear'});
  }
  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen, closeModal, inputState, inputDispatch }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
