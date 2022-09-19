import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteMovie, getMovies } from "../../api/movie/movie";
import MovieListItem from "../Admin/Movie/MovieListItem";
import ConfirmModal from "../Modals/ConfirmModal";

const pageNo = 0;
const limit = 5;

const LatestUpload = () => {
  const [movies, setMovies] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [busy, setBusy] = useState(false);

  const fetchLatestUploads = async () => {
    const { error, movies } = await getMovies(pageNo, limit);
    if (error) return toast.error(error);
    setMovies([...movies]);
  };

  // Delete Movie
  const handleDelete = (movie) => {
    setSelectedMovie(movie);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteMovie(selectedMovie.id);
    if (error) return toast.error(error);

    setBusy(false);
    fetchLatestUploads();
    closeConfirmModal();
    toast.success(message);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
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
          {movies.map((movie) => {
            return (
              <MovieListItem
                key={movie.id}
                movie={movie}
                onDelete={() => handleDelete(movie)}
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
    </>
  );
};

export default LatestUpload;
