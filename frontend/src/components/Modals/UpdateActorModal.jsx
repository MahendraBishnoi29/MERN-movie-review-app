import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateActor } from "../../api/actor";
import ActorForm from "../Form/ActorForm";
import ModalContainer from "./ModalContainer";

const UpdateActorModal = ({
  visible,
  onClose,
  initialState,
  OnUpdatedActor,
}) => {
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, actor } = await updateActor(initialState.id, data);
    setBusy(false);
    if (error) return toast.error(error);

    OnUpdatedActor(actor);
    toast.success("Actor Updated Successfully 🎉");
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
