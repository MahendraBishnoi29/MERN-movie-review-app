import React from "react";
import MovieListItem from "../Admin/Movie/MovieListItem";

const LatestUpload = () => {
  return (
    <div className="bg-white shadow-lg dark:shadow dark:bg-secondary p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>

      <MovieListItem
        movie={{
          poster:
            "https://www.economist.com/img/b/1190/670/90/sites/default/files/images/2015/09/blogs/economist-explains/code2.png",
          title: "lorem ipsum dolor sit amet.",
          status: "public",
          genres: ["Action", "Sci-Fi"],
        }}
      />
    </div>
  );
};

export default LatestUpload;
