import React from "react";
import { useState } from "react";
import { commonInputClasses } from "../../../utils/theme";
import Submit from "../../Form/Submit";
import TagsInput from "../../Form/tagsInput/TagsInput";
import LiveSearch from "../../LiveSearch/LiveSearch";
import { toast } from "react-toastify";
import WriterModal from "../../Modals/WriterModal";
import CastFrom from "../../Form/CastFrom";
import CastModal from "../../Modals/CastModal";
import PosterSelector from "../../PosterSelector/PosterSelector";
import GenresSelector from "../../Form/genreSelector/GenresSelector";
import GenreModal from "../../Modals/GenreModal";

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

export const renderItem = (res) => {
  return (
    <div key={res?.id} className="flex space-x-2 rounded overflow-hidden">
      <img src={res?.avatar} alt="" className="w-14 h-14 object-cover" />
      <p className="dark:text-white font-semibold">{res?.name}</p>
    </div>
  );
};

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
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState("");

  const { title, storyLine, director, writers, cast, tags, genres } = movieInfo;

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      setSelectedPoster(URL.createObjectURL(poster));
      return setMovieInfo({ ...movieInfo, poster });
    }
    setMovieInfo({ ...movieInfo, [name]: value });
  };

  // Update Tags
  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  // Update Directors
  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };

  // Update Cast
  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };

  // Update Writers
  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    for (let writer of writers) {
      if (writer.id === profile.id) {
        return toast.warning("Profile is already selected");
      }
    }
    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };

  // Update Genres
  const updateGenre = (genres) => {
    setMovieInfo({ ...movieInfo, genres });
    toast.success("Genres Selected");
  };

  // Remove Writers
  const handleWriterRemove = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);
    if (!newWriters.length) setShowWritersModal(false);
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };

  // Remove Cast
  const handleCastRemove = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);
    if (!newCast.length) setShowCastModal(false);
    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  return (
    <>
      <div className="flex space-x-3">
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
            <TagsInput value={tags} onChange={updateTags} name="tags" />
          </div>

          <div>
            <Label htmlFor="director">Director</Label>
            <LiveSearch
              name="director"
              value={director.name}
              onSelect={updateDirector}
              placeholder="Search profile"
              results={results}
              renderItem={renderItem}
            />
          </div>

          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={writers.length} htmlFor="writers">
                Writers
              </LabelWithBadge>
              <ViewAllBtn
                visible={writers.length}
                onClick={() => setShowWritersModal(true)}
              >
                View All
              </ViewAllBtn>
            </div>

            <LiveSearch
              name="writers"
              onSelect={updateWriters}
              renderItem={renderItem}
              placeholder="Search profile"
              results={results}
            />
          </div>

          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={cast.length}>
                Add Cast & Crew
              </LabelWithBadge>
              <ViewAllBtn
                onClick={() => setShowCastModal(true)}
                visible={cast.length}
              >
                View All
              </ViewAllBtn>
            </div>
            <CastFrom onSubmit={updateCast} />-
          </div>
          <input
            onChange={handleChange}
            name="releaseDate"
            type="date"
            className={commonInputClasses + " border-2 rounded p-1 w-auto"}
          />

          <Submit onClick={handleSubmit} type="button" value="Upload" />
        </div>
        <div className="w-[30%] space-y-5">
          <PosterSelector
            selectedPoster={selectedPoster}
            name="poster"
            onChange={handleChange}
            accept="image/jpg, image/jpeg, image/png"
          />
          <GenresSelector
            badge={genres.length}
            onClick={() => setShowGenreModal(true)}
          />
        </div>
      </div>

      <WriterModal
        visible={showWritersModal}
        onClose={() => setShowWritersModal(false)}
        profiles={writers}
        onRemoveProfile={handleWriterRemove}
      />

      <CastModal
        visible={showCastModal}
        onClose={() => setShowCastModal(false)}
        casts={cast}
        onRemoveProfile={handleCastRemove}
      />

      <GenreModal
        previousGenre={genres}
        onSubmit={updateGenre}
        visible={showGenreModal}
        onClose={() => setShowGenreModal(false)}
      />
    </>
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

const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className="dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center translate-x-2 -translate-y-1 text-sm">
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };

  return (
    <div className="relative">
      <Label htmlFor={htmlFor}> {children} </Label>
      {renderBadge()}
    </div>
  );
};

const ViewAllBtn = ({ visible, children, onClick }) => {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="dark:text-white text-primary hover:underline transition"
    >
      {children}
    </button>
  );
};

export default MovieForm;
