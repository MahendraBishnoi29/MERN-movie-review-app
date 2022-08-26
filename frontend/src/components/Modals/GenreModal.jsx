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
            <Genre selected={i === 5} key={gen}>
              {gen}
            </Genre>
          );
        })}
      </div>
    </ModalContainer>
  );
};

const Genre = ({ children, selected, onClick }) => {
  const getSelectedStyle = () => {
    return selected
      ? "bg-light-subtle dark:bg-white dark:text-primary text-white"
      : "text-primary dark:text-white";
  };
  return (
    <button
      onClick={onClick}
      className={
        getSelectedStyle() +
        " border-2 dark:border-dark-subtle border-light-subtle p-1 rounded mr-3"
      }
    >
      {children}
    </button>
  );
};

export default GenreModal;
