import React, { useState } from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import { deleteMovie } from "../../../api/movie/movie";
import ConfirmModal from "../../Modals/ConfirmModal";

const MovieListItem = ({ movie, afterDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);

  // Delete Movie
  const handleDeleteMovie = async () => {
    setBusy(true);
    const { error, message } = await deleteMovie(movie.id);
    setBusy(false);
    if (error) return toast.error(error);
    toast.success(message);
    afterDelete(movie);
    closeConfirmModal();
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const closeConfirmModal = () => setShowConfirmModal(false);

  return (
    <>
      <MovieCard movie={movie} onDelete={displayConfirmModal} />
      <div className="p-0">
        <ConfirmModal
          busy={busy}
          onConfirm={handleDeleteMovie}
          visible={showConfirmModal}
          onCancel={closeConfirmModal}
        />
      </div>
    </>
  );
};

const MovieCard = ({ movie, onDelete, onEdit, onOpen }) => {
  const { poster, title, genres = [], status } = movie;
  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img src={poster} alt={title} className="w-ful aspect-video" />
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
              <button onClick={() => onDelete()} type="button" className="">
                <BsTrash />
              </button>
              <button onClick={() => onEdit()} type="button" className="">
                <BsPencilSquare />
              </button>
              <button onClick={() => onOpen()} type="button" className="">
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
