import React from "react";
import MovieForm from "../Admin/Movie/MovieForm";
import ModalContainer from "./ModalContainer";

const UpdateMovieModal = ({ visible, initialState }) => {
  return (
    <ModalContainer visible={visible}>
      <MovieForm initialState={initialState} />
    </ModalContainer>
  );
};

export default UpdateMovieModal;
