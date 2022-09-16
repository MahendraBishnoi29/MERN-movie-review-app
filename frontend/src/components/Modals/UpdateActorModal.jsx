import React, { useState } from "react";
import { toast } from "react-toastify";
import { createActor } from "../../api/actor";
import ActorForm from "../Form/ActorForm";
import ModalContainer from "./ModalContainer";

const UpdateActorModal = ({ visible, onClose }) => {
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (data) => {
    // setBusy(true);
    // const { error, actor } = await toast.promise(createActor(data), {
    //   pending: "Creating Actor...",
    //   success: "Actor Created Successfully 🎉",
    // });
    // setBusy(false);
    // if (error) return toast.error(error);
    // onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        onSubmit={!busy ? handleSubmit : null}
        title="Update Actor"
        btnTitle="Update"
        busy={busy}
      />
    </ModalContainer>
  );
};

export default UpdateActorModal;
