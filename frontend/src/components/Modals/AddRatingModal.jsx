import React from "react";
import RatingForm from "../Form/RatingForm";
import ModalContainer from "../Modals/ModalContainer";

const AddRatingModal = () => {
  const handleSubmit = (data) => {};

  return (
    <ModalContainer visible ignoreContainer>
      <RatingForm onSubmit={handleSubmit} />
    </ModalContainer>
  );
};

export default AddRatingModal;
