import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getLatestUploads } from "../../api/movie/movie";

const HeroSlideShow = () => {
  const [slide, setSlide] = useState({});
  const [movies, setMovies] = useState([]);

  const fetchLatestUploads = async () => {
    const { error, movies } = await getLatestUploads();
    if (error) return toast.error("Error Fetching Movies For Slide");
    setMovies([...movies]);
    setSlide(movies[0]);
  };

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  return (
    <div className="w-full flex">
      <div className="w-4/5 aspect-video">
        <img src={slide.poster} alt="" className="" />
      </div>
      <div className="w-1/5 bg-red-200 aspect-video"></div>
    </div>
  );
};

export default HeroSlideShow;
