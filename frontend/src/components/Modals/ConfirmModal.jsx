import React from "react";
import { ImSpinner } from "react-icons/im";
import ModalContainer from "./ModalContainer";

const ConfirmModal = ({
  subtitle,
  onConfirm,
  onCancel,
  title,
  visible,
  busy,
  onClose,
}) => {
  const commonClasses = "px-3 py-1 text-white rounded";
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className="dark:bg-primary bg-white rounded p-4">
        <h1 className="text-red-400 font-semibold text-2xl">Are You Sure?</h1>
        <p className="text-secondary dark:text-white text-sm">
          This action will remove this Movie Permanently.
        </p>

        <div className="flex items-center space-x-3 mt-3">
          {busy ? (
            <p className="flex items-center space-x-2">
              <ImSpinner className="animate-spin" />
              <span className="">Please Wait...</span>
            </p>
          ) : (
            <>
              <button className={commonClasses + " bg-red-400"} type="button">
                Confirm
              </button>
              <button className={commonClasses + " bg-blue-400"} type="button">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;
