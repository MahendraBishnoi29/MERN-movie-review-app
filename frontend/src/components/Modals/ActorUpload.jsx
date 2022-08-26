import React from "react";
import ModalContainer from "./ModalContainer";

const ActorUpload = ({ visible, onClose }) => {
  return (
    <ModalContainer
      visible={visible}
      onClose={onClose}
      ignoreContainer
    ></ModalContainer>
  );
};

export default ActorUpload;
