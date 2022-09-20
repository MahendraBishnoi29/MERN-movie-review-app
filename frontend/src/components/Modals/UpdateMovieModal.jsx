/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMovieForUpdate, updateMovie } from "../../api/movie/movie";
import MovieForm from "../Admin/Movie/MovieForm";
import ModalContainer from "./ModalContainer";

const UpdateMovieModal = ({ visible, onSuccess, movieId }) => {
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, movie, message } = await updateMovie(movieId, data);
    setBusy(false);
    if (error) return toast.error(error);
    toast.success(message);
    onSuccess(movie);
  };

  // Edit Movie
  const fetchMovieForUpdate = async () => {
    const { movie, error } = await getMovieForUpdate(movieId);
    if (error) return toast.error(error);
    setReady(true);
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (movieId) fetchMovieForUpdate();
  }, [movieId]);

  return (
    <ModalContainer visible={visible}>
      {ready ? (
        <MovieForm
          btnTitle="Update"
          initialState={selectedMovie}
          onSubmit={!busy ? handleSubmit : null}
          busy={busy}
        />
      ) : (
        <div className="w-full h-full justify-center items-center">
          <p className="text-2xl text-light-subtle dark:text-dark-subtle animate-pulse">
            Please Wait...
          </p>
        </div>
      )}
    </ModalContainer>
  );
};

export default UpdateMovieModal;
