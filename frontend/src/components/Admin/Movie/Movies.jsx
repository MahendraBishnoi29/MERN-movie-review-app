import React from "react";
import { useState } from "react";
import { getMovies } from "../../../api/movie/movie";
import { toast } from "react-toastify";
import MovieListItem from "./MovieListItem";
import { useEffect } from "react";

const limit = 10;
const currentPageNo = 0;

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (pageNo) => {
    const { movies, error } = await getMovies(pageNo, limit);

    if (error) return toast.error(error.message);
    console.log(movies);
    setMovies([...movies]);
  };

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (
    <div className="space-y-3 p-5">
      {movies.map((movie) => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Movies;
