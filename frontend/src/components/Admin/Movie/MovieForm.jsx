import React from "react";

const MovieForm = () => {
  return (
    <form className="flex space-x-3">
      <div className="w-[70%] h-5 ">
        <label
          htmlFor="title"
          className="dark:text-dark-subtle text-light-subtle font-semibold"
        >
          Title
        </label>
        <input
          type="text"
          placeholder="John Wick"
          className="w-full bg-transparent dark:text-white text-primary outline-none border-b-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition font-semibold"
        />
      </div>
      <div className="w-[30%] h-5 "></div>
    </form>
  );
};

export default MovieForm;
