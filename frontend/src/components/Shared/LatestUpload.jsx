import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getMovies } from "../../api/movie/movie";
import MovieListItem from "../Admin/Movie/MovieListItem";

const pageNo = 0;
const limit = 5;

const LatestUpload = () => {
  const [movies, setMovies] = useState([]);

  const fetchLatestUploads = async () => {
    const { error, movies } = await getMovies(pageNo, limit);
    if (error) return toast.error(error);
    setMovies([...movies]);
  };

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  return (
    <div className="bg-white shadow-lg dark:shadow dark:bg-secondary p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>

      <div className="space-y-3">
        {movies.map((movie) => {
          return <MovieListItem key={movie.id} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default LatestUpload;
