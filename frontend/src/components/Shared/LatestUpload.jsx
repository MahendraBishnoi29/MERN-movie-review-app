import React from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";

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

const MovieListItem = ({ movie, onDelete, onEdit, onOpen }) => {
  const { poster, title, genres = [], status } = movie;
  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img src={poster} alt={title} className="w-ful aspect-video" />
            </div>
          </td>
          <td className="w-full pl-5">
            <div className="">
              <h1 className="font-semibold text-primary dark:text-white">
                {title}
              </h1>

              <div className="space-x-1">
                {genres.map((g, i) => {
                  return (
                    <span
                      key={g + i}
                      className="text-xs text-primary dark:text-white"
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>
          <td className="px-5">
            <p className="text-primary dark:text-white"> {status} </p>
          </td>
          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white">
              <button onClick={() => onDelete()} type="button" className="">
                <BsTrash />
              </button>
              <button onClick={() => onEdit()} type="button" className="">
                <BsPencilSquare />
              </button>
              <button onClick={() => onOpen()} type="button" className="">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default LatestUpload;
