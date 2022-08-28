import React, { createContext } from "react";

const SearchContext = createContext();

let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const SearchProvider = ({ children }) => {
  return <SearchContext.Provider> {children} </SearchContext.Provider>;
};

export default SearchProvider;
