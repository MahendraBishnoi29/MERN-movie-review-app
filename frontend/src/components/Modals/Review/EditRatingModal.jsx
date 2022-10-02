import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { editReview } from "../../../api/review";
import RatingForm from "../../Form/RatingForm";
import ModalContainer from "../ModalContainer";

const EditRatingModal = ({ visible, initialState, onClose, onSuccess }) => {
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, message } = await editReview(initialState.id, data);
    setBusy(false);
    if (error) return toast.error(error + " error while editing the review");
    toast.success(message);
    onClose();
    onSuccess({ ...data });
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm
        busy={busy}
        initialState={initialState}
        onSubmit={handleSubmit}
      />
    </ModalContainer>
  );
};

export default EditRatingModal;
