/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { startTransition, useRef } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getLatestUploads } from "../../api/movie/movie";

let count = 0;
let intervalId;

const HeroSlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState({});
  const [clonedSlide, setClonedSlide] = useState({});
  const [visible, setVisible] = useState(true);
  const [upNext, setUpNext] = useState([]);
  const [slides, setSlides] = useState([]);

  const slideRef = useRef();
  const clonedSlideRef = useRef();

  // Fetch Latest Uploads
  const fetchLatestUploads = async () => {
    const { error, movies } = await getLatestUploads();
    if (error) return toast.error(error);
    setSlides([...movies]);
    setCurrentSlide(movies[0]);
  };

  const autoPlaySlide = () => {
    setInterval(handleOnNextClick, 3300);
  };

  // Update Up Next Section
  const updateUpNext = (currentIndex) => {};

  // Next Slide
  const handleOnNextClick = () => {
    setClonedSlide(slides[count]);

    count = (count + 1) % slides.length;
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-to-left");
    slideRef.current.classList.add("slide-in-from-right");
  };

  // Prev Slide
  const handleOnPrevClick = () => {
    setClonedSlide(slides[count]);

    count = (count + slides.length - 1) % slides.length;
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-to-right");
    slideRef.current.classList.add("slide-in-from-left");
  };

  const handleAnimationEnd = () => {
    const classes = [
      "slide-out-to-right",
      "slide-in-from-left",
      "slide-in-from-right",
      "slide-out-to-left",
    ];
    slideRef.current.classList.remove(...classes);
    clonedSlideRef.current.classList.remove(...classes);
    setClonedSlide({});
  };

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  useEffect(() => {
    if (slides.length) autoPlaySlide();
  }, [slides.length]);

  return (
    <div className="w-full flex">
      {/* Slide Show Section  */}
      <div className="md:w-4/5 w-full aspect-video relative overflow-hidden">
        <img
          onAnimationEnd={handleAnimationEnd}
          ref={slideRef}
          className="aspect-video object-cover"
          src={currentSlide.poster}
          alt=""
        />
        {/* <img
          onAnimationEnd={handleAnimationEnd}
          ref={clonedSlideRef}
          className="aspect-video object-cover absolute inset-0"
          src={clonedSlide.poster}
          alt=""
        /> */}
        <SlideControlBtns
          onPrevSlide={handleOnPrevClick}
          onNextClick={handleOnNextClick}
        />
      </div>
      {/* Up Next Section */}
      <div className="w-1/5 md:block hidden space-y-3 px-3">
        <h1 className="font-semibold text-2xl text-primary dark:text-white">
          Up Next
        </h1>
        {upNext.map(({ poster, id }) => {
          return (
            <img
              key={id}
              src={poster}
              className="aspect-video object-cover rounded"
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
};

const SlideControlBtns = ({ onPrevSlide, onNextClick }) => {
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
        onClick={onNextClick}
        className="bg-primary rounded border-2 text-white text-lg p-2 outline-none"
        type="button"
      >
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};

const Slide = forwardRef((props, ref) => {
  const { title, id, src, className = "", ...rest } = props;
  return (
    <Link
      to={`/movie/${id}`}
      {...rest}
      ref={ref}
      className={"w-full cursor-pointer block " + className}
    >
      {src ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="aspect-video object-cover"
        />
      ) : null}
      {title ? (
        <div className="absolute inset-0 flex flex-col justify-end py-3 bg-gradient-to-t from-white via-transparent dark:from-primary dark:via-transparent">
          <h1 className="font-semibold text-4xl dark:text-highlight-dark text-highlight ">
            {title}
          </h1>
        </div>
      ) : null}
    </Link>
  );
});

export default HeroSlideShow;
