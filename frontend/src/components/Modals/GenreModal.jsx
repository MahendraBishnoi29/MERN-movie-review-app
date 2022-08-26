import React, { useEffect } from "react";
import ModalContainer from "./ModalContainer";
import genres from "../../utils/genres";
import { useState } from "react";
import Submit from "../Form/Submit";

const GenreModal = ({ visible, onClose, onSubmit, previousGenre }) => {
  const [selectedGenre, setSelectedGenre] = useState([]);

  const handleGenreSelector = (gen) => {
    let newGenre = [];

    if (selectedGenre.includes(gen))
      newGenre = selectedGenre.filter((genre) => genre !== gen);
    else newGenre = [...selectedGenre, gen];

    setSelectedGenre([...newGenre]);
  };

  const handleSubmit = () => {
    onSubmit(selectedGenre);
    onClose();
  };

  const handleClose = () => {
    setSelectedGenre(previousGenre);
    onClose();
  };

  useEffect(() => {
    setSelectedGenre(previousGenre);
  }, [previousGenre]);

  return (
    <ModalContainer onClose={handleClose} visible={visible}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="dark:text-white text-primary text-2xl font-semibold text-center">
            Select Genres
          </h1>
          <div className="space-y-3">
            {genres.map((gen) => {
              return (
                <Genre
                  onClick={() => handleGenreSelector(gen)}
                  selected={selectedGenre.includes(gen)}
                  key={gen}
                >
                  {gen}
                </Genre>
              );
            })}
          </div>
        </div>

        <div className="w-56 self-end">
          <Submit value="select" type="button" onClick={handleSubmit} />
        </div>
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
