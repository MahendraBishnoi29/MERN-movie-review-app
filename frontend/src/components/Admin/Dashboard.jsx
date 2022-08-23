import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSunFill } from "react-icons/bs";
import { useTheme } from "../../hooks";

const Dashboard = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between relative">
      <input
        type="text"
        placeholder="search movies"
        className="border-2 transition bg-transparent rounded text-lg p-1 outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white 
        dark:text-white focus:border-primary"
      />

      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="dark:text-white text-light-subtle"
        >
          <BsSunFill size={24} />
        </button>

        <button
          onClick={() => setShowOptions(!showOptions)}
          className="flex items-center space-x-1 border-secondary text-secondary hover:opacity-80 transition font-semibold border-2 rounded text-lg mr-8 px-3 py-1 dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-light-subtle"
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>
      </div>

      <CreateOptions visible={showOptions} />
    </div>
  );
};

const CreateOptions = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="animate-scale absolute right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded">
      <Option>Add Movies</Option>
      <Option>Add Actors</Option>
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary transition hover:opacity-80"
    >
      {children}
    </button>
  );
};

export default Dashboard;
