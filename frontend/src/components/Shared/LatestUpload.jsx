import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteMovie, getMovieForUpdate } from "../../api/movie/movie";
import { useMovies } from "../../hooks";
import MovieListItem from "../Admin/Movie/MovieListItem";
import ConfirmModal from "../Modals/ConfirmModal";
import UpdateMovieModal from "../Modals/UpdateMovieModal";

const LatestUpload = () => {
  const [movies, setMovies] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [busy, setBusy] = useState(false);

  const { fetchLatestUploads, latestUploads } = useMovies();

  const handleDelete = (movie) => {
    setSelectedMovie(movie);
    setShowConfirmModal(true);
  };

  // Delete Movie
  const handleDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteMovie(selectedMovie.id);
    if (error) return toast.error(error);

    setBusy(false);
    fetchLatestUploads();
    closeConfirmModal();
    toast.success(message);
  };

  const closeConfirmModal = () => setShowConfirmModal(false);
  const closeUpdateModal = () => setShowUpdateModal(false);

  // Edit Movie
  const handleEdit = async ({ id }) => {
    const { error, movie } = await getMovieForUpdate(id);
    setShowUpdateModal(true);
    if (error) return toast.error(error);

    setSelectedMovie(movie);
  };

  const handleUpdate = (movie) => {
    const updatedMovies = movies.map((m) => {
      if (m.id === movie.id) return movie;
      return m;
    });

    setMovies([...updatedMovies]);
  };

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  return (
    <>
      <div className="bg-white shadow-lg dark:shadow dark:bg-secondary p-5 rounded col-span-2">
        <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Recent Uploads
        </h1>

        <div className="space-y-3">
          {latestUploads.map((movie) => {
            return (
              <MovieListItem
                key={movie.id}
                movie={movie}
                onDelete={() => handleDelete(movie)}
                onEdit={() => handleEdit(movie)}
              />
            );
          })}
        </div>
      </div>
      <ConfirmModal
        busy={busy}
        onConfirm={handleDeleteConfirm}
        visible={showConfirmModal}
        onCancel={closeConfirmModal}
      />

      <UpdateMovieModal
        initialState={selectedMovie}
        onClose={closeUpdateModal}
        onSuccess={handleUpdate}
        visible={showUpdateModal}
      />
    </>
  );
};

export default LatestUpload;
