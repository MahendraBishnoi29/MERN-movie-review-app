import React from "react";
import ActorForm from "../Form/ActorForm";
import ModalContainer from "./ModalContainer";

const ActorUpload = ({ visible, onClose }) => {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        onSubmit={handleSubmit}
        title="Create a new Actor"
        btnTitle="Create"
      />
    </ModalContainer>
  );
};

export default ActorUpload;
