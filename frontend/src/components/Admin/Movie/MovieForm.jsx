import React from "react";
import { commonInputClasses } from "../../../utils/theme";
import TagsInput from "../../Form/tagsInput/TagsInput";
import LiveSearch from "../../LiveSearch/LiveSearch";

const MovieForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-3">
      <div className="w-[70%] h-5 space-y-5">
        <div>
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            placeholder="John Wick"
            className={commonInputClasses + " border-b-2 font-semibold"}
          />
        </div>

        <div>
          <Label htmlFor="storyLine">Story Line</Label>
          <textarea
            id="stroyLine"
            className={commonInputClasses + " resize-none h-24 border-b-2"}
            placeholder="Movie story line..."
          ></textarea>
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <TagsInput name="tags" />
        </div>

        <LiveSearch />
      </div>
      <div className="w-[30%] h-5 "></div>
    </form>
  );
};

const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="dark:text-dark-subtle text-light-subtle font-semibold"
    >
      {children}
    </label>
  );
};

export default MovieForm;
