import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { toast } from "react-toastify";
import { getLatestUploads } from "../../api/movie/movie";

let count = 0;

const HeroSlideShow = () => {
  const [slide, setSlide] = useState({});
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();

  const fetchLatestUploads = async () => {
    const { error, movies } = await getLatestUploads();
    if (error) return toast.error("Error Fetching Movies For Slide");
    setSlides([...movies]);
    setSlide(movies[0]);
  };

  const handleNextSlide = () => {
    count = (count + 1) % slides.length;
    setSlide(slides[count]);
    setCurrentIndex(count);

    slideRef.current.classList.add("slide-in-right");
  };

  const handleAnimationEnd = () => {
    slideRef.current.classList.remove("slide-in-right");
  };

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  return (
    <div className="w-full flex">
      {/* Slide Show Section  */}
      <div className="w-4/5 aspect-video relative overflow-hidden">
        <img
          onAnimationEnd={handleAnimationEnd}
          ref={slideRef}
          src={slide.poster}
          alt=""
          className="aspect-video object-cover"
        />
        <SlideControlBtns onNextSlide={handleNextSlide} />
      </div>
      {/* Up Next Section */}
      <div className="w-1/5 bg-red-200 aspect-video"></div>
    </div>
  );
};

const SlideControlBtns = ({ onPrevSlide, onNextSlide }) => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2">
      <button
        onClick={onPrevSlide}
        className="bg-primary rounded border-2 text-white text-lg p-2 outline-none"
        type="button"
      >
        <AiOutlineDoubleLeft />
      </button>
      <button
        onClick={onNextSlide}
        className="bg-primary rounded border-2 text-white text-lg p-2 outline-none"
        type="button"
      >
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};

export default HeroSlideShow;
