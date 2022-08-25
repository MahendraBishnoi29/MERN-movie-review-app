import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import ModalContainer from "./ModalContainer";

const WriterModal = ({ profiles = [], visible, onClose, onRemoveProfile }) => {
  return (
    <ModalContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[40rem] max-h-[34rem] overflow-auto p-2 custom-scrollbar">
        {profiles.map(({ id, name, avatar }) => {
          return (
            <div
              key={id}
              className="flex space-x-3 dark:bg-secondary bg-white drop-shadow-md rounded"
            >
              <img
                src={avatar}
                alt={name}
                className="w-16 h-16 rounded object-cover aspect-square"
              />
              <p className="w-full font-semibold dark:text-white text-primary">
                {name}
              </p>
              <button
                onClick={() => onRemoveProfile(id)}
                className="dark:text-white text-primary hover:opacity-80 transition p-2"
              >
                <AiOutlineClose />
              </button>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
};

export default WriterModal;
