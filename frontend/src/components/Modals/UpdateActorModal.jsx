import React, { useState } from "react";
import { toast } from "react-toastify";
import { createActor, updateActor } from "../../api/actor";
import ActorForm from "../Form/ActorForm";
import ModalContainer from "./ModalContainer";

const UpdateActorModal = ({ visible, onClose, initialState }) => {
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, actor } = await toast.promise(
      updateActor(initialState.id, data),
      {
        pending: "Updating Actor...",
        success: "Actor Updated Successfully 🎉",
      }
    );
    setBusy(false);
    if (error) return toast.error(error);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        onSubmit={!busy ? handleSubmit : null}
        title="Update Actor"
        btnTitle="Update"
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
};

export default UpdateActorModal;
