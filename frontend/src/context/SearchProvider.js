import React, { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const SearchContext = createContext();

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
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const search = async (method, query) => {
    const { error, result } = await method(query);
    if (error) return toast.error(error);
    if (!result?.length) return setResultNotFound(true);

    setResults(results);
  };

  const debounceFunc = debounce(search, 300);

  const handleSearch = (method, query) => {
    setSearching(true);
    if (!query.trim()) {
      setSearching(false);
      setResults([]);
      setResultNotFound(false);
    }
    debounceFunc(method, query);
  };

  return (
    <SearchContext.Provider
      value={{ handleSearch, searching, resultNotFound, results }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
