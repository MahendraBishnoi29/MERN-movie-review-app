import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { commonInputClasses } from "../../utils/theme";
import PosterSelector from "../PosterSelector/PosterSelector";
import Selector from "../PosterSelector/Selector";
import { ImSpinner3 } from "react-icons/im";
import { useEffect } from "react";

const defaultActorInfo = {
  name: "",
  about: "",
  avatar: null,
  gender: "",
};

const genderOptions = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
];

// Validate Actor
const validateActor = ({ avatar, name, about, gender }) => {
  if (!name.trim()) return { error: "Please enter Actor Name!" };
  if (!about.trim()) return { error: "About section should not be empty!" };
  if (!gender) return { error: "Please Select a Gender" };
  if (avatar && !avatar.type?.startsWith("image"))
    return { error: "Invalid Image/Avatar File!" };

  return { error: null };
};

const ActorForm = ({ title, btnTitle, busy, onSubmit, initialState }) => {
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const updatePoster = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedAvatar(url);
  };

  const handleChange = ({ target }) => {
    const { value, files, name } = target;
    if (name === "avatar" && files.value !== 0) {
      const file = files[0];
      updatePoster(file);
      return setActorInfo({ ...actorInfo, avatar: file });
    }

    setActorInfo({ ...actorInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateActor(actorInfo);
    if (error) return toast.error(error);

    const formData = new FormData();
    for (let key in actorInfo) {
      if (key) formData.append(key, actorInfo[key]);
    }

    onSubmit(formData);
  };

  const { name, about, gender } = actorInfo;

  useEffect(() => {
    if (initialState) {
      setActorInfo({ ...initialState, avatar: null });
      setSelectedAvatar(initialState.avatar);
    }
  }, [initialState]);

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-primary bg-white p-3 w-[35rem] rounded"
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-xl dark:text-white text-primary">
          {title}
        </h1>
        <button
          className="rounded h-8 w-24 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition flex items-center justify-center"
          type="submit"
        >
          {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
        </button>
      </div>

      <div className="flex space-x-2">
        <PosterSelector
          name="avatar"
          onChange={handleChange}
          selectedPoster={selectedAvatar}
          label="Select Avatar"
          accept="image/jpg, image/jpeg, image/png"
          className="rounded w-36 h-36 aspect-square object-cover"
        />
        <div className="flex-grow flex flex-col space-y-2">
          <input
            name="name"
            onChange={handleChange}
            value={name}
            placeholder="Enter Name"
            type="text"
            className={commonInputClasses + " border-b-2"}
          />
          <textarea
            value={about}
            name="about"
            onChange={handleChange}
            placeholder="About"
            className={commonInputClasses + " border-b-2 resize-none h-full"}
          ></textarea>
        </div>
      </div>

      <div className="mt-3">
        <Selector
          options={genderOptions}
          label="Gender"
          value={gender}
          onChange={handleChange}
          name="gender"
        />
      </div>
    </form>
  );
};

export default ActorForm;
