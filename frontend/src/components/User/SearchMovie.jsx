import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { searchPublicMovies } from "../../api/movie/movie";
import Container from "../Navbar/Container";
import MovieList from "../Shared/MovieList/MovieList";
import NotFoundText from "../Shared/NotFoundText";

const SearchMovie = () => {
  const [movies, setMovies] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");

  const searchMovies = async (val) => {
    const { error, topRatedMovies } = await searchPublicMovies(val);
    if (error) return toast.error(error);

    if (!topRatedMovies?.length) {
      setResultNotFound(true);
      return setMovies([]);
    }

    setResultNotFound(false);
    setMovies([...topRatedMovies]);
  };

  useEffect(() => {
    if (query?.trim()) searchMovies(query);
  }, [query]);

  return (
    <div className="dark:bg-primary bg-white min-h-screen py-8">
      <Container className="px-2 xl:p-0">
        <NotFoundText text="Record Not Found!" visible={resultNotFound} />
        <MovieList movies={movies} />
      </Container>
    </div>
  );
};

export default SearchMovie;
