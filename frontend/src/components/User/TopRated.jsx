import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";
import { getTopRatedMovies } from "../../api/movie/movie";
import GridContainer from "../Shared/GridContainer";
import MovieList from "../Shared/Movie List/MovieList";

const TopRated = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const { error, movies } = await getTopRatedMovies();
    if (error) return toast.error(error);
    setMovies([...movies]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return <MovieList movies={movies} title="Viewers Choice (Movies)" />;
};

export default TopRated;
