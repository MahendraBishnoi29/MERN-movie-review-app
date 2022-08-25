import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import ModalContainer from "./ModalContainer";

const WriterModal = ({ profiles = [], visible, onClose }) => {
  return (
    <ModalContainer onClose={onClose} visible={visible}>
      <div className="space-y-2">
        {profiles.map(({ id, name, avatar }) => {
          return (
            <div key={id} className="flex space-x-3">
              <img
                src={avatar}
                alt={name}
                className="w-16 h-16 rounded object-cover"
              />
              <p className="w-full font-semibold dark:text-white text-primary">
                {name}
              </p>
              <button className="dark:text-white text-primary hover:opacity-80 transition p-2">
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
