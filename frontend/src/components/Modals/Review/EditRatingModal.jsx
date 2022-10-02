import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editReview } from "../../../api/review";
import RatingForm from "../../Form/RatingForm";
import ModalContainer from "../ModalContainer";

const EditRatingModal = ({ visible, initialState, onClose, onSuccess }) => {
  const handleSubmit = async (data) => {
    const { error, message } = await editReview(initialState.id, data);
    if (error) return toast.error(error + " error while editing the review");
    toast.success(message);
    onClose();
    onSuccess({ ...data });
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm initialState={initialState} onSubmit={handleSubmit} />
    </ModalContainer>
  );
};

export default EditRatingModal;
