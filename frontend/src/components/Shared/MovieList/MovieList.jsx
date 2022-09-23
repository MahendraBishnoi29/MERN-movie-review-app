import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import GridContainer from "../GridContainer";

const trimMovieTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "...";
};

const MovieList = ({ title, movies = [] }) => {
  if (!movies.length) return null;

  return (
    <div>
      <h1 className="text-2xl font-semibold dark:text-white text-secondary pt-3 pb-3">
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
  const { title, poster, reviews, id } = movie;
  return (
    <Link to={`/movie/${id}`}>
      <img
        loading="lazy"
        src={poster}
        alt={title}
        className="aspect-video object-cover rounded-lg"
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
    </Link>
  );
};

export default MovieList;
