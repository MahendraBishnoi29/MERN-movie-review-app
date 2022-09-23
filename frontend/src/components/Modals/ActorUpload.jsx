import React, { useState } from "react";
import { toast } from "react-toastify";
import { createActor } from "../../api/actor";
import ActorForm from "../Form/ActorForm";
import ModalContainer from "./ModalContainer";

const ActorUpload = ({ visible, onClose }) => {
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error } = await toast.promise(createActor(data), {
      pending: "Creating Actor...",
      success: "Actor Created Successfully 🎉",
    });
    setBusy(false);
    if (error) return toast.error(error);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        onSubmit={!busy ? handleSubmit : null}
        title="Create a new Actor"
        btnTitle="Create"
        busy={busy}
      />
    </ModalContainer>
  );
};

export default ActorUpload;
