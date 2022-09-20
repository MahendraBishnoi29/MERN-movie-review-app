import React from "react";
import AuthProvider from "./AuthProvider";
import MoviesProvider from "./Movie/MovieProvider";
import SearchProvider from "./SearchProvider";
import ThemeProvider from "./ThemeProvider";

const ContextProviders = ({ children }) => {
  return (
    <SearchProvider>
      <MoviesProvider>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </MoviesProvider>
    </SearchProvider>
  );
};

export default ContextProviders;
