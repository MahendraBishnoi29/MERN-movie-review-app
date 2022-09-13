import React from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";

const LatestUpload = () => {
  return (
    <div className="bg-white shadow-lg dark:shadow dark:bg-secondary p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>
      <MovieListItem />
    </div>
  );
};

const MovieListItem = () => {
  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img
                src="https://www.economist.com/img/b/1190/670/90/sites/default/files/images/2015/09/blogs/economist-explains/code2.png"
                alt=""
                className="w-ful aspect-video"
              />
            </div>
          </td>
          <td className="w-full pl-5">
            <div className="">
              <h1 className="font-semibold text-primary dark:text-white">
                Lorem ipsum dolor sit amet.
              </h1>

              <div className="space-x-1">
                <span className="text-xs text-primary dark:text-white">
                  Action
                </span>
                <span className="text-xs text-primary dark:text-white">
                  Drama
                </span>
              </div>
            </div>
          </td>
          <td className="px-5">
            <p className="text-primary dark:text-white">Public</p>
          </td>
          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white">
              <button type="button" className="">
                <BsTrash />
              </button>
              <button type="button" className="">
                <BsPencilSquare />
              </button>
              <button type="button" className="">
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
