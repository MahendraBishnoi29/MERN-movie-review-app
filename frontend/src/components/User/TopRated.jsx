import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";
import { getTopRatedMovies } from "../../api/movie/movie";
import GridContainer from "../Shared/GridContainer";

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

  const trimMovieTitle = (text = "") => {
    if (text.length <= 20) return text;
    return text.substring(0, 20) + "...";
  };

  return (
    <GridContainer>
      {movies.map((movie) => {
        return (
          <div key={movie.id}>
            <img
              src={movie.poster}
              alt={movie.title}
              className="aspect-video object-cover"
            />
            <h1
              title={movie.title}
              className="text-lg dark:text-white text-secondary font-semibold"
            >
              {trimMovieTitle(movie.title)}
            </h1>
            {movie.reviews.ratingAvg ? (
              <p className="flex items-center space-x-1 text-highlight dark:text-highlight-dark">
                <span className="">{movie.reviews?.ratingAvg}</span>
                <AiFillStar />
              </p>
            ) : (
              <p className="text-highlight dark:text-highlight-dark">
                No Reviews
              </p>
            )}
          </div>
        );
      })}
    </GridContainer>
  );
};

export default TopRated;
