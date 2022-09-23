import React from "react";
import { AiFillStar } from "react-icons/ai";
import GridContainer from "../GridContainer";

const trimMovieTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "...";
};

const MovieList = ({ title, movies = [] }) => {
  if (!movies.length) return null;

  return (
    <div>
      <h1 className="text-2xl font-semibold dark:text-white text-secondary mb-5">
        {title}
      </h1>
      <GridContainer>
        {movies.map((movie) => {
          return <MovieListItem key={movie.id} movie={movie} />;
        })}
      </GridContainer>
    </div>
  );
};

const MovieListItem = ({ movie }) => {
  const { title, poster, reviews } = movie;
  return (
    <div>
      <img
        loading="lazy"
        src={poster}
        alt={title}
        className="aspect-video object-cover"
      />
      <h1
        title={title}
        className="text-lg dark:text-white text-secondary font-semibold"
      >
        {trimMovieTitle(title)}
      </h1>
      {reviews.ratingAvg ? (
        <p className="flex items-center space-x-1 text-highlight dark:text-highlight-dark">
          <span className="">{reviews?.ratingAvg}</span>
          <AiFillStar />
        </p>
      ) : (
        <p className="text-highlight dark:text-highlight-dark">No Reviews</p>
      )}
    </div>
  );
};

export default MovieList;
