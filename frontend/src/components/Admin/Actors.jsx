import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { getActors } from "../../../../backend/controllers/actor";

const Actors = () => {
  const fetchActors = async () => {
    const res = await getActors(0, 5);
    console.log(res);
  };

  useEffect(() => {
    fetchActors();
  }, []);

  return <div className="grid grid-cols-4 gap-3 my-5"></div>;
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
    <div className="bg-white shadow-lg dark:shadow-lg dark:bg-secondary h-20 rounded overflow-hidden">
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
