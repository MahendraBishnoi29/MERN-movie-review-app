import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const defaultInputStyle =
  "dark:border-dark-subtle border-light-subtle dark:focus:border-white dark:text-white focus:border-primary text-lg";

const SearchInputForm = ({
  placeholder,
  showResetIcon,
  onSubmit,
  onReset,
  inputClassName = defaultInputStyle,
}) => {
  const [value, setValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  const resetSearchInput = () => {
    setValue("");
    onReset();
  };

  return (
    <form className="relative" onSubmit={handleOnSubmit}>
      <input
        value={value}
        onChange={({ target }) => setValue(target.value)}
        type="text"
        placeholder={placeholder}
        className={
          "border-2 transition bg-transparent rounded p-1 outline-none " +
          inputClassName
        }
      />
      {showResetIcon ? (
        <button
          onClick={resetSearchInput}
          className="absolute top-1/2 -translate-y-1/2 right-2 text-secondary dark:text-white"
          type="button"
        >
          <AiOutlineClose />
        </button>
      ) : null}
    </form>
  );
};

export default SearchInputForm;
