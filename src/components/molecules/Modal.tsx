type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-2/3">
          <div className="closeContainer">
            <p className="text-right">
              <button onClick={onClose}>X</button>
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
