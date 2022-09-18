import React from "react";
import MovieForm from "../Admin/Movie/MovieForm";
import ModalContainer from "./ModalContainer";

const UpdateMovieModal = ({ visible }) => {
  return (
    <ModalContainer visible={visible}>
      <MovieForm />
    </ModalContainer>
  );
};

export default UpdateMovieModal;
