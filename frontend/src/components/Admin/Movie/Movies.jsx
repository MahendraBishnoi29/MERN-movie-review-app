import React from "react";
import { useState } from "react";
import { getMovieForUpdate, getMovies } from "../../../api/movie/movie";
import { toast } from "react-toastify";
import MovieListItem from "./MovieListItem";
import { useEffect } from "react";
import NextPrevBtn from "../Actors/NextPrevBtn";
import UpdateMovieModal from "../../Modals/UpdateMovieModal";

const limit = 10;
let currentPageNo = 0;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(false);

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

  // Edit Movie
  const handleOnEdit = async ({ id }) => {
    const { movie, error } = await getMovieForUpdate(id);
    if (error) return toast.error(error);
    setSelectedMovie(movie);
    setShowUpdateModal(true);
  };

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (
    <>
      <div className="space-y-3 p-5 md:pr-72 sm:pr-8">
        {movies.map((movie) => (
          <MovieListItem
            onEdit={() => handleOnEdit(movie)}
            key={movie.id}
            movie={movie}
          />
        ))}
        <NextPrevBtn onNext={onNext} onPrev={onPrev} />
      </div>
      {/* Update Movie Modal */}
      <UpdateMovieModal
        initialState={selectedMovie}
        visible={showUpdateModal}
      />
    </>
  );
};

export default Movies;
