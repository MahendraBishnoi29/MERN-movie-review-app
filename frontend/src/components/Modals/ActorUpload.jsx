import React from "react";
import { createActor } from "../../api/actor";
import ActorForm from "../Form/ActorForm";
import ModalContainer from "./ModalContainer";

const ActorUpload = ({ visible, onClose }) => {
  const handleSubmit = async (data) => {
    const res = await createActor(data);
    console.log(res);
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
