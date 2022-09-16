import React from "react";
import { useState } from "react";
import { getMovies } from "../../../api/movie/movie";
import { toast } from "react-toastify";
import MovieListItem from "./MovieListItem";
import { useEffect } from "react";
import NextPrevBtn from "../Actors/NextPrevBtn";

const limit = 10;
let currentPageNo = 0;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const fetchMovies = async (pageNo) => {
    const { movies, error } = await getMovies(pageNo, limit);
    if (error) return toast.error(error.message);

    if (!movies?.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setMovies([...movies]);
  };

  // Next Page
  const onNext = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchMovies(currentPageNo);
  };

  // Prev Page
  const onPrev = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchMovies(currentPageNo);
  };

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (
    <div className="space-y-3 p-5 md:pr-72 sm:pr-8">
      {movies.map((movie) => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
      <NextPrevBtn onNext={onNext} onPrev={onPrev} />
    </div>
  );
};

export default Movies;
