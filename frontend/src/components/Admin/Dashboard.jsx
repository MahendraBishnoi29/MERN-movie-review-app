import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-between">
      <input
        type="text"
        placeholder="search movies"
        className="border-2 transition bg-transparent rounded text-lg p-1 outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white 
        dark:text-white focus:border-primary"
      />

      <button className="flex items-center space-x-1 border-secondary hover:border-primary text-secondary hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1">
        <span>Create</span>
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default Dashboard;
