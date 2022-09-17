import React, { useState } from "react";

const SearchInputForm = ({ placeholder, onSubmit }) => {
  const [value, setValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        value={value}
        onChange={({ target }) => setValue(target.value)}
        type="text"
        placeholder={placeholder}
        className="border-2 transition bg-transparent rounded text-lg p-1 outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white 
        dark:text-white focus:border-primary"
      />
    </form>
  );
};

export default SearchInputForm;
