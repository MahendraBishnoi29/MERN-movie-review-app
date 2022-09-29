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
    setMovie(movie);
  };

  useEffect(() => {
    if (movieId) fetchMovie();
  }, [movieId]);

  return <div className="text-2xl">{movie?.title}</div>;
};

export default SingleMoviePage;
