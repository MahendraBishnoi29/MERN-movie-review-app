import React from "react";
import { useState } from "react";
import { commonInputClasses } from "../../../utils/theme";
import Submit from "../../Form/Submit";
import TagsInput from "../../Form/tagsInput/TagsInput";
import LiveSearch from "../../LiveSearch/LiveSearch";

export const results = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "7",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "8",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
];

const MovieForm = () => {
  const defaultMovieInfo = {
    title: "",
    storyLine: "",
    tags: [],
    cast: [],
    director: {},
    writers: [],
    releaseDate: "",
    poster: null,
    genres: [],
    type: "",
    language: "",
    status: "",
  };

  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };

  const renderItem = (res) => {
    return (
      <div key={res.id} className="flex space-x-2 rounded overflow-hidden">
        <img src={res.avatar} alt="" className="w-14 h-14 object-cover" />
        <p className="dark:text-white font-semibold">{res.name}</p>
      </div>
    );
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  const { title, storyLine, director } = movieInfo;

  return (
    <form onSubmit={handleSubmit} className="flex space-x-3">
      <div className="w-[70%] h-5 space-y-5">
        <div>
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            value={title}
            onChange={handleChange}
            name="title"
            id="title"
            placeholder="John Wick"
            className={commonInputClasses + " border-b-2 font-semibold"}
          />
        </div>

        <div>
          <Label htmlFor="storyLine">Story Line</Label>
          <textarea
            value={storyLine}
            onChange={handleChange}
            name="storyLine"
            id="stroyLine"
            className={commonInputClasses + " resize-none h-24 border-b-2"}
            placeholder="Movie story line..."
          ></textarea>
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <TagsInput onChange={updateTags} name="tags" />
        </div>

        <LiveSearch
          placeholder="Search profile"
          results={results}
          renderItem={renderItem}
          onSelect={(res) => console.log(res)}
        />
        <Submit value="Upload" />
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
