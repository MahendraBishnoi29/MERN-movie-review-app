import React from "react";
import { BsFillSunFill } from "react-icons/bs";

export default function Navbar() {
  return (
    <div className="bg-secondary">
      <div className="text-white max-w-screen-xl mx-auto p-2">
        <div className="flex justify-between items-center">
          <img
            src="./logo2.png"
            className="cursor-pointer h-10"
            alt="appLogo"
          />

          <ul className="flex items-center space-x-4">
            <li>
              <button className="bg-dark-subtle p-1 rounded">
                <BsFillSunFill className="text-secondary" size={22} />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-0.5 rounded bg-transparent text-l  outline-none focus:border-white transition text-white"
                placeholder="Search a movie"
              />
            </li>
            <li className="text-white font-semibold text-lg ">LogIn</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
