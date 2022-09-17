import React from "react";

const SearchInputForm = ({ placeholder }) => {
  return (
    <form>
      <input
        type="text"
        placeholder={placeholder}
        className="border-2 transition bg-transparent rounded text-lg p-1 outline-none dark:border-dark-subtle border-light-subtle dark:focus:border-white 
        dark:text-white focus:border-primary"
      />
    </form>
  );
};

export default SearchInputForm;
