import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import RatingForm from "../../Form/RatingForm";
import ModalContainer from "../ModalContainer";

const EditRatingModal = ({ visible, initialState, onClose, onSuccess }) => {
  const { movieId } = useParams();

  const handleSubmit = async (data) => {};

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm initialState={initialState} onSubmit={handleSubmit} />
    </ModalContainer>
  );
};

export default EditRatingModal;
