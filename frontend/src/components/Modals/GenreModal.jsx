import React from "react";
import ModalContainer from "./ModalContainer";
import genres from "../../utils/genres";

const GenreModal = ({ visible, onClose }) => {
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <h1 className="dark:text-white text-primary text-2xl font-semibold text-center">
        Select Genre
      </h1>

      <div className="space-y-3">
        {genres.map((gen, i) => {
          return (
            <button
              key={gen}
              className={
                (i === 5
                  ? "bg-light-subtle dark:bg-white dark:text-primary text-white"
                  : " ") +
                " border-2 dark:border-dark-subtle border-light-subtle dark:text-white text-primary p-1 rounded mr-3"
              }
            >
              {gen}
            </button>
          );
        })}
      </div>
    </ModalContainer>
  );
};

export default GenreModal;
