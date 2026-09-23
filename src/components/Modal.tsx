import type { FC, ReactNode } from "react"
import { useModal } from "../shared/hooks";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

type ModalProps = {
  children: ReactNode;
  bg: string;
  color: string;
}

const Modal: FC<ModalProps> = ({ children, bg, color }) => {
  const { closeModal } = useModal();
  const portal = document.getElementById("portal")!;
  return createPortal(
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className="fixed inset-0 flex justify-center items-center bg-black/70" 
      onClick={closeModal}
    >
      <motion.div
        initial={{
          scale: 0,
          opacity: 0
        }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        exit={{
          scale: 0.3,
          opacity: 0
        }}
        className={`${bg} p-4 rounded-lg z-10 ${color} max-w-500 min-w-100`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>,
    portal
  );
}

export default Modal
