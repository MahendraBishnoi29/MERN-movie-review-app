import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateMovie } from "../../api/movie/movie";
import MovieForm from "../Admin/Movie/MovieForm";
import ModalContainer from "./ModalContainer";

const UpdateMovieModal = ({ visible, onClose, onSuccess, initialState }) => {
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, movie, message } = await updateMovie(initialState.id, data);
    setBusy(false);
    if (error) return toast.error(error);
    toast.success(message);
    onSuccess(movie);
    onClose();
  };

  return (
    <ModalContainer visible={visible}>
      <MovieForm
        btnTitle="Update"
        initialState={initialState}
        onSubmit={!busy ? handleSubmit : null}
        busy={busy}
      />
    </ModalContainer>
  );
};

export default UpdateMovieModal;
