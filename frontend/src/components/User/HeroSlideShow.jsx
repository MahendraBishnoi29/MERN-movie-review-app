/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { toast } from "react-toastify";
import { getLatestUploads } from "../../api/movie/movie";
// Import Swiper React components

const HeroSlideShow = () => {
  const [slide, setSlide] = useState({});
  const [slides, setSlides] = useState([]);

  const fetchLatestUploads = async () => {
    const { error, movies } = await getLatestUploads();
    if (error) return toast.error("Error Fetching Movies For Slide");
    setSlides([...movies]);
    setSlide(movies[0]);
  };

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  return (
    <div className="w-full flex">
      {/* Slide Show Section  */}
      <div className="w-4/5 aspect-video relative overflow-hidden"></div>
      {/* Up Next Section */}
      <div className="w-1/5 bg-red-200 aspect-video"></div>
    </div>
  );
};

// <img
// onAnimationEnd={handleAnimationEnd}
// ref={slideRef}
// src={slide.poster}
// alt=""
// className="aspect-video object-cover"
// />
// <img
// onAnimationEnd={handleAnimationEnd}
// ref={clonedSlideRef}
// src={clonedSlide.poster}
// alt=""
// className="aspect-video object-cover absolute inset-0"
// />
// <SlideControlBtns
// onPrevSlide={handlePrevSlide}
// onNextSlide={handleNextSlide}
// />

export default HeroSlideShow;
