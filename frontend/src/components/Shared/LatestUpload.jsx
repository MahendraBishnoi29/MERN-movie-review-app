/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useMovies } from "../../hooks";
import MovieListItem from "../Admin/Movie/MovieListItem";

const LatestUpload = () => {
  const { fetchLatestUploads, latestUploads } = useMovies();

  const handleUpdateUI = () => fetchLatestUploads();

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  return (
    <>
      <div className="bg-white shadow-lg dark:shadow dark:bg-secondary p-5 rounded col-span-2">
        <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Recent Uploads
        </h1>

        <div className="space-y-3">
          {latestUploads.map((movie) => {
            return (
              <MovieListItem
                key={movie.id}
                movie={movie}
                afterDelete={handleUpdateUI}
                afterUpdate={handleUpdateUI}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LatestUpload;
