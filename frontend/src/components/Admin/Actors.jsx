import React from "react";

const Actors = () => {
  return (
    <div className="grid grid-cols-4 gap-3 my-5">
      <div className="bg-white shadow-lg dark:shadow-lg dark:bg-secondary h-20 rounded overflow-hidden">
        <div className="flex cursor-pointer">
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
        </div>
      </div>
    </div>
  );
};

export default Actors;
