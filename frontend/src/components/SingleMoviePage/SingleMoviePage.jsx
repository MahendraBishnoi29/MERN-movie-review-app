/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleMovie } from "../../api/movie/movie";
import Container from "../Navbar/Container";
import RatingStar from "../Shared/RatingStar";

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

  const {
    trailer,
    poster,
    storyLine,
    director = {},
    writers = [],
    title,
    id,
    reviews = {},
  } = movie;

  return (
    <div className="bg-white dark:bg-primary min-h-screen">
      <Container>
        <video poster={poster} src={trailer} controls></video>
        <div className="flex justify-between">
          <h1 className="text-4xl text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />
            <Link
              to={`/movie/reviews/${id}`}
              className="text-highlight dark:text-highlight-dark hover:underline"
            >
              {reviews.reviewsCount} Reviews
            </Link>

            <button
              className="text-highlight dark:text-highlight-dark hover:underline"
              type="button"
            >
              Rate This Movie
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>

          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Director:
            </p>
            <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
              {director.name}
            </p>
          </div>

          <div className="flex">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
              Writers:
            </p>
            <div className="space-x-2 flex flex-row">
              {writers.map((w) => {
                return (
                  <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
                    {w.name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleMoviePage;
