import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getMostRated } from "../../api/admin";
import { convertReviewCount } from "../../utils/helper";
import RatingStar from "./RatingStar";

const MostRated = () => {
  const [mostRatedMovies, setMostRatedMovies] = useState([]);

  const fetchMostRated = async () => {
    const { error, movies } = await getMostRated();
    if (error) return toast.error("error fetching Most rated" + error);
    setMostRatedMovies([...movies]);
  };

  useEffect(() => {
    fetchMostRated();
  }, []);

  return (
    <div className="bg-white shadow-lg dark:shadow dark:bg-secondary p-5 rounded">
      <h1 className="font-semibold dark:text-white text-primary text-2xl mb-2">
        Most Rated Movies
      </h1>

      <ul className="space-y-3">
        {mostRatedMovies.map((movie) => {
          return (
            <li key={movie.id}>
              <h1 className="text-secondary dark:text-white font-semibold">
                {movie.title}
              </h1>
              <div className="flex space-x-2">
                <RatingStar rating={movie.reviews?.ratingAvg} />
                <p className="text-light-subtle dark:text-dark-subtle">
                  {convertReviewCount(movie.reviews?.reviewsCount)} Reviews
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MostRated;
