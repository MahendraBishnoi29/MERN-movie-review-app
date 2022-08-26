import React from "react";
import ActorForm from "../Form/ActorForm";
import ModalContainer from "./ModalContainer";

const ActorUpload = ({ visible, onClose }) => {
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm title="Create a new Actor" btnTitle="Create" />
    </ModalContainer>
  );
};

export default ActorUpload;
