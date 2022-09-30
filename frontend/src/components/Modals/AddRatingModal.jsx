import React from "react";
import RatingForm from "../Form/RatingForm";
import ModalContainer from "../Modals/ModalContainer";

const AddRatingModal = ({ visible, onClose }) => {
  const handleSubmit = (data) => {};

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm onSubmit={handleSubmit} />
    </ModalContainer>
  );
};

export default AddRatingModal;
