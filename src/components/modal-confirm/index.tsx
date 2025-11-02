import { CircleAlert } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ isOpen, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <dialog
      id="confirm_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div>
            <CircleAlert className="size-20 text-red-500" />
          </div>
          <h1 className="font-extrabold text-lg text-red-500">End Parking</h1>
          <p className="text-gray-400 text-sm text-light text-center">
            Are you sure you want to end this parking?
          </p>
        </div>
        <div className="modal-action justify-center gap-4 items-center">
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn bg-red-500 text-white" onClick={onConfirm}>
            Yes, End
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmModal;
