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

  const search = async (method, query, updaterFunc) => {
    const { error, results } = await method(query);
    if (error) return toast.error(error);

    if (!results?.length) {
      setResults([]);
      updaterFunc && updaterFunc([]);
      return setResultNotFound(true);
    }

    setResultNotFound(false);
    setResults(results);
    updaterFunc && updaterFunc([...results]);
  };

  const debounceFunc = debounce(search, 300);

  const handleSearch = (method, query, updaterFunc) => {
    setSearching(true);
    if (!query.trim()) {
      updaterFunc && updaterFunc([]);
      return resetSearch();
    }
    debounceFunc(method, query, updaterFunc);
  };

  const resetSearch = () => {
    setSearching(false);
    setResults([]);
    setResultNotFound(false);
  };

  return (
    <SearchContext.Provider
      value={{ handleSearch, resetSearch, searching, resultNotFound, results }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
