import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-between relative">
      <input
        type="text"
        placeholder="search movies"
        className="border-2 transition bg-transparent rounded text-lg p-1 outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white 
        dark:text-white focus:border-primary"
      />

      <button className="flex items-center space-x-1 border-secondary hover:border-primary text-secondary hover:opacity-80 transition font-semibold border-2 rounded text-lg mr-8 px-3 py-1">
        <span>Create</span>
        <AiOutlinePlus />
      </button>

      <div className="absolute right-0 mr-4 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded">
        <button className="dark:text-white text-secondary transition hover:opacity-80">
          Add Movie
        </button>
        <button className="dark:text-white text-secondary transition hover:opacity-80">
          Add Actor
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
