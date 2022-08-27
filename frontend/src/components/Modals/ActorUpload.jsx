import React from "react";
import { toast } from "react-toastify";
import { createActor } from "../../api/actor";
import ActorForm from "../Form/ActorForm";
import ModalContainer from "./ModalContainer";

const ActorUpload = ({ visible, onClose }) => {
  const handleSubmit = async (data) => {
    const { error, actor } = await toast.promise(createActor(data), {
      pending: "Creating Actor...",
      success: "Actor Created Successfully 🎉",
    });
    if (error) return toast.error(error);
    onClose();
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
