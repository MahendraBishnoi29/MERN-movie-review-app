import React from "react";
import { useState } from "react";
import { BsBoxArrowDownRight, BsPencilSquare, BsTrash } from "react-icons/bs";

const Actors = () => {
  const [showOptions, setShowOptions] = useState(false);

  const onMouseEnter = () => {
    setShowOptions(true);
  };

  const onMouseLeave = () => {
    setShowOptions(false);
  };

  return (
    <div className="grid grid-cols-4 gap-3 my-5">
      <div className="bg-white shadow-lg dark:shadow-lg dark:bg-secondary h-20 rounded overflow-hidden">
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="flex cursor-pointer relative"
        >
          <img
            src="https://m.media-amazon.com/images/M/MV5BZTBiYmNkMGUtMzgzOC00YmZmLThiZDgtOTQxNzMxYmMwNmJiXkEyXkFqcGdeQXVyMTg1NjAxOQ@@._V1_UY1200_CR114,0,630,1200_AL_.jpg"
            alt=""
            className="w-20 h-full object-fill"
          />
          <div className="px-2">
            <h1 className="text-xl text-primary dark:text-white font-semibold">
              John Bhai
            </h1>
            <p className="text-primart dark:text-white">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Laboriosam, maiores.
            </p>
          </div>

          {showOptions ? (
            <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm space-x-2">
              <button
                className="p-2 rounded-full bg-white text-primary hover:opacity-80 m-2"
                type="button"
              >
                <BsTrash />
              </button>
              <button
                className="p-2 rounded-full bg-white text-primary hover:opacity-80"
                type="button"
              >
                <BsPencilSquare />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Actors;
