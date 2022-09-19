import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { searchMovieForAdmin } from "../../../api/movie/movie";
import NotFoundText from "../../Shared/NotFoundText";
import MovieListItem from "./MovieListItem";

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");

  const searchMovies = async (val) => {
    const { error, results } = await searchMovieForAdmin(val);
    if (error) return toast.error(error);

    if (!results.length) {
      setResultNotFound(true);
      return setMovies([]);
    }

    setResultNotFound(false);
    setMovies([...results]);
  };

  useEffect(() => {
    if (query?.trim()) searchMovies(query);
  }, [query]);

  return (
    <div className="p-5 pr-24 space-y-3">
      <NotFoundText text="Record Not Found!" visible={resultNotFound} />
      {!resultNotFound &&
        movies.map((movie) => <MovieListItem movie={movie} key={movie.id} />)}
    </div>
  );
};

export default SearchMovies;
