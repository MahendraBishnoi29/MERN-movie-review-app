import React, { useState } from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import { deleteMovie } from "../../../api/movie/movie";
import { getPoster } from "../../../utils/helper";
import ConfirmModal from "../../Modals/ConfirmModal";
import UpdateMovieModal from "../../Modals/UpdateMovieModal";

const MovieListItem = ({ movie, afterDelete, afterUpdate }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Delete Movie
  const handleDeleteMovie = async () => {
    setBusy(true);
    const { error, message } = await deleteMovie(movie.id);
    setBusy(false);
    if (error) return toast.error(error);
    closeConfirmModal();
    toast.success(message);
    afterDelete(movie);
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const closeConfirmModal = () => setShowConfirmModal(false);

  const handleOnEdit = () => {
    setShowUpdateModal(true);
    setSelectedMovieId(movie.id);
  };

  const handleOnUpdate = (movie) => {
    afterUpdate(movie);
    setShowUpdateModal(false);
    setSelectedMovieId(null);
  };

  return (
    <>
      <MovieCard
        movie={movie}
        onDelete={displayConfirmModal}
        onEdit={handleOnEdit}
      />
      <div className="p-0">
        <ConfirmModal
          busy={busy}
          onConfirm={handleDeleteMovie}
          visible={showConfirmModal}
          onCancel={closeConfirmModal}
        />
        <UpdateMovieModal
          movieId={selectedMovieId}
          visible={showUpdateModal}
          onSuccess={handleOnUpdate}
        />
      </div>
    </>
  );
};

const MovieCard = ({ movie, onDelete, onEdit, onOpen }) => {
  const { poster, responsivePosters, title, genres = [], status } = movie;
  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img
                src={getPoster(responsivePosters) || poster}
                alt={title}
                className="w-ful aspect-video"
              />
            </div>
          </td>
          <td className="w-full pl-2.5">
            <div className="">
              <h1 className="font-semibold text-primary dark:text-white">
                {title}
              </h1>

              <div className="space-x-1">
                {genres.map((g, i) => {
                  return (
                    <span
                      key={g + i}
                      className="text-xs text-primary dark:text-white"
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>
          <td className="px-3">
            <p className="text-primary dark:text-white"> {status} </p>
          </td>
          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white">
              <button onClick={() => onDelete()} type="button">
                <BsTrash />
              </button>
              <button onClick={() => onEdit()} type="button">
                <BsPencilSquare />
              </button>
              <button onClick={() => onOpen()} type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MovieListItem;
