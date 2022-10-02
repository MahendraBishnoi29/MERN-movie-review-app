import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addReview } from "../../../api/review";
import RatingForm from "../../Form/RatingForm";
import ModalContainer from "../ModalContainer";

const AddRatingModal = ({ visible, onClose, onSuccess }) => {
  const { movieId } = useParams();

  const handleSubmit = async (data) => {
    const { error, message, reviews } = await addReview(movieId, data);
    if (error) return toast.error(error);

    toast.success(message);
    onSuccess(reviews);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm onSubmit={handleSubmit} />
    </ModalContainer>
  );
};

export default AddRatingModal;
