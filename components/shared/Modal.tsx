import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <div>
      <div className="w-full h-screen fixed top-0 left-0 z-10 bg-black/40 flex justify-center items-center">
        <div className="w-[600px] max-w-[90%] sm:max-w-[650px] shadow-lg shadow-black/70 rounded-xl z-20   border-blue-500 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
