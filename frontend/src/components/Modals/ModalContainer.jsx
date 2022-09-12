import React from "react";

const ModalContainer = ({ visible, children, onClose, ignoreContainer }) => {
  if (!visible) return null;

  const handleClick = (e) => {
    if (e.target.id === "modal-container") onClose && onClose();
  };

  const renderChildren = () => {
    if (ignoreContainer) return children;

    return (
      <div className="dark:bg-primary bg-white rounded w-[40rem] h-[34rem] overflow-auto p-2 custom-scrollbar">
        {children}
      </div>
    );
  };

  return (
    <div
      onClick={handleClick}
      id="modal-container"
      className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      {renderChildren()}
    </div>
  );
};

export default ModalContainer;
