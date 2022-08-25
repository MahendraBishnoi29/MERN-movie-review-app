import React from "react";
import ModalContainer from "./ModalContainer";

const WriterModal = ({ profiles = [], visible, onClose }) => {
  return (
    <ModalContainer onClose={onClose} visible={visible}>
      {profiles.map(({ id, name, avatar }) => {
        return (
          <div key={id} className="flex">
            <img src={avatar} alt={name} className="" />
            <p className=""> {name} </p>
          </div>
        );
      })}
    </ModalContainer>
  );
};

export default WriterModal;
