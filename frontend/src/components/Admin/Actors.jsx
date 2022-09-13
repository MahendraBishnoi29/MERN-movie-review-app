import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { getActors } from "../../api/actor";
import { toast } from "react-toastify";

let pageNo = 0;
const limit = 20;

const Actors = () => {
  const [actors, setActors] = useState([]);

  const fetchActors = async () => {
    const { profiles, error } = await getActors(pageNo, limit);
    if (error)
      return toast.error("Something Went Wrong While Fetching Actors...");

    setActors([...profiles]);
  };

  useEffect(() => {
    fetchActors();
  }, []);

  return (
    <div className="p-5">
      <div className="grid grid-cols-4 gap-5 p-5">
        {actors.map((actor) => (
          <ActorProfile key={actor.id} profile={actor} />
        ))}
      </div>

      <div className="flex justify-end items-center space-x-3 mt-5 pr-7">
        <button
          className="text-primary dark:text-white hover:underline"
          type="button"
        >
          Prev
        </button>
        <button
          className="text-primary dark:text-white hover:underline"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const ActorProfile = ({ profile }) => {
  const [showOptions, setShowOptions] = useState(false);

  const onMouseEnter = () => {
    setShowOptions(true);
  };

  const onMouseLeave = () => {
    setShowOptions(false);
  };

  if (!profile) return null;

  const { name, avatar, about = "" } = profile;

  return (
    <div className="bg-white shadow-2xl dark:shadow-2xl dark:bg-secondary h-20 rounded overflow-hidden">
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="flex cursor-pointer relative"
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 h-full aspect-square object-cover"
        />
        <div className="px-2">
          <h1 className="text-xl text-primary dark:text-white font-semibold">
            {name}
          </h1>
          <p className="text-primart dark:text-white">
            {about.substring(0, 50)}
          </p>
        </div>

        <Options visible={showOptions} />
      </div>
    </div>
  );
};

const Options = ({ visible, onEdit, onDelete }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm space-x-2">
      <button
        onClick={onDelete}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 m-2"
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEdit}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80"
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};
export default Actors;
