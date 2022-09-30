import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addReview } from "../../api/review";
import RatingForm from "../Form/RatingForm";
import ModalContainer from "../Modals/ModalContainer";

const AddRatingModal = ({ visible, onClose }) => {
  const { movieId } = useParams();

  const handleSubmit = async (data) => {
    const { error, message } = await addReview(movieId, data);
    if (error) return toast.error("Error Adding Review" + error);
    toast.success(message);
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm onSubmit={handleSubmit} />
    </ModalContainer>
  );
};

export default AddRatingModal;
