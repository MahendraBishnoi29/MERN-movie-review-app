import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks";
import SearchInputForm from "../Shared/SearchInputForm";

const Header = ({ onAddMovie, onAddActor }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();

  const navigate = useNavigate();

  const options = [
    { title: "Add Movie", onClick: onAddMovie },
    { title: "Add Actor", onClick: onAddActor },
  ];

  const handleSearch = (query) => {
    if (!query) return;

    navigate(`/search?title=${query}`);
  };

  return (
    <div className="flex items-center justify-between relative">
      <SearchInputForm onSubmit={handleSearch} placeholder="Search Movies..." />

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

      <CreateOptions visible={showOptions} options={options} />
    </div>
  );
};

const CreateOptions = ({ options, visible }) => {
  if (!visible) return null;
  return (
    <div className="animate-scale z-50 absolute right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded">
      {options.map(({ title, onClick }) => {
        return (
          <Option key={title} onClick={onClick}>
            {title}
          </Option>
        );
      })}
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

export default Header;
