import React from "react";
import { commonInputClasses } from "../../utils/theme";
import PosterSelector from "../PosterSelector/PosterSelector";

const ActorForm = ({ title, btnTitle }) => {
  return (
    <div className="dark:bg-primary bg-white p-3 w-[35rem] rounded">
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-xl dark:text-white text-primary">
          {title}
        </h1>
        <button
          className="rounded px-3 py-1 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition"
          type="submit"
        >
          {btnTitle}
        </button>
      </div>

      <form className="flex space-x-2">
        {/* <img
          src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
          alt="img"
          className="rounded w-36 h-36 aspect-square object-cover"
        /> */}
        <PosterSelector className="rounded w-36 h-36 aspect-square object-cover" />

        <div className="flex-grow flex flex-col space-y-2">
          <input
            placeholder="Enter Name"
            type="text"
            className={commonInputClasses + " border-b-2"}
          />
          <textarea
            placeholder="About"
            className={commonInputClasses + " border-b-2 resize-none h-full"}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default ActorForm;
