import React from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";

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

export default MovieListItem;
