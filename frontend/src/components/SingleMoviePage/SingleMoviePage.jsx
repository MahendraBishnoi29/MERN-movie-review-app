/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleMovie } from "../../api/movie/movie";

const SingleMoviePage = () => {
  const [movie, setMovie] = useState({});
  const [ready, setReady] = useState(false);

  const { movieId } = useParams();

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return toast.error(error + "Error Fetching Single Movie");
    setReady(true);
    setMovie(movie);
  };

  useEffect(() => {
    if (movieId) fetchMovie();
  }, [movieId]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center bg-white dark:bg-primary">
        <p className="text-4xl text-light-subtle dark:text-dark-subtle animate-pulse">
          Wait Please....
        </p>
      </div>
    );

  return <div className="text-2xl">{movie?.title}</div>;
};

export default SingleMoviePage;
