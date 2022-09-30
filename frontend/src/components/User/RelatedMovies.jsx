/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getRelatedMovies } from "../../api/movie/movie";
import MovieList from "../Shared/MovieList/MovieList";

const RelatedMovies = ({ movieId }) => {
  const [movies, setMovies] = useState([]);

  const fetchRelatedMovies = async () => {
    const { error, movies } = await getRelatedMovies(movieId);
    if (error) return toast.error(error + "Error Fetching Related Movies!");
    setMovies([...movies]);
  };

  useEffect(() => {
    if (movieId) fetchRelatedMovies();
  }, [movieId]);

  return <MovieList title="Related Movies" movies={movies} />;
};

export default RelatedMovies;
