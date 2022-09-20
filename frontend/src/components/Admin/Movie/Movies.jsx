/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import MovieListItem from "./MovieListItem";
import { useEffect } from "react";
import NextPrevBtn from "../Actors/NextPrevBtn";
import { useMovies } from "../../../hooks";

let currentPageNo = 0;

const Movies = () => {
  const {
    fetchMovies,
    movies: newMovies,
    fetchNextPage,
    fetchPrevPage,
  } = useMovies();

  //  const handleAfterDelete = () => fetchMovies();
  const handleUpdateUI = () => fetchMovies();

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (
    <>
      <div className="space-y-3 p-5 md:pr-72 sm:pr-8">
        {newMovies.map((movie) => (
          <MovieListItem
            afterDelete={handleUpdateUI}
            afterUpdate={handleUpdateUI}
            key={movie.id}
            movie={movie}
          />
        ))}
        <NextPrevBtn onNext={fetchNextPage} onPrev={fetchPrevPage} />
      </div>
    </>
  );
};

export default Movies;
