import type { FC, ReactNode } from "react"
import { useModal } from "../shared/hooks";

type ModalProps = {
  children: ReactNode;
  bg: string;
  color: string;
}

const Modal: FC<ModalProps> = ({children, bg, color}) => {
  const {closeModal} = useModal();
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="fixed inset-0 bg-black/70" onClick={closeModal} />

      <div className={`${bg} p-4 rounded-lg z-10 ${color} max-w-500 min-w-100`}>
        {children}
      </div>
    </div>
  )
}

export default Modal
