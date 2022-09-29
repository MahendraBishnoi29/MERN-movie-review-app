/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
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
  const [slides, setSlides] = useState([]);
  const [visible, setVisible] = useState(true);
  const [upNext, setUpNext] = useState([]);
  const [clonedSlide, setClonedSlide] = useState({});

  const slideRef = useRef();
  const clonedSlideRef = useRef();

  // Fetch Latest Uploads
  const fetchLatestUploads = async () => {
    const { error, movies } = await getLatestUploads();
    if (error) return toast.error(error);
    setSlides([...movies]);
    setCurrentSlide(movies[0]);
  };

  const autoStartSlide = () => {
    intervalId = setInterval(handleNextSlide, 3500);
  };

  const pauseSlideShow = () => {
    clearInterval(intervalId);
  };

  // Update Up Next Section
  const updateUpNext = (currentIndex) => {
    if (!slides.length) return;
    const upNextCount = currentIndex + 1;
    const end = upNextCount + 3;

    let newSlides = [...slides];
    newSlides = newSlides.slice(upNextCount, end);

    if (!newSlides.length) {
      newSlides = [...slides].slice(0, 3);
    }
    setUpNext([...newSlides]);
  };

  // Next Slide
  const handleNextSlide = () => {
    pauseSlideShow();
    setClonedSlide(slides[count]);

    count = (count + 1) % slides.length;
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-left");
    slideRef.current.classList.add("slide-in-right");
    updateUpNext(count);
  };

  // Prev Slide
  const handlePrevSlide = () => {
    pauseSlideShow();

    setClonedSlide(slides[count]);
    count = (count + slides.length - 1) % slides.length;
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-to-right");
    slideRef.current.classList.add("slide-in-from-left");
    updateUpNext(count);
  };

  // End the Animation
  const handleAnimationEnd = () => {
    const classes = [
      "slide-out-to-right",
      "slide-in-from-left",
      "slide-in-right",
      "slide-out-left",
    ];
    slideRef.current.classList.remove(...classes);
    clonedSlideRef.current.classList.remove(...classes);
    setClonedSlide({});
    autoStartSlide();
  };

  // Visibility for Pausing the Slide Show
  const handleOnVisibilityChange = () => {
    const visibility = document.visibilityState;
    if (visibility === "hidden") setVisible(false);
    if (visibility === "visible") setVisible(true);
  };

  useEffect(() => {
    fetchLatestUploads();
    document.addEventListener("visibilitychange", handleOnVisibilityChange);

    return () => {
      pauseSlideShow();
      document.removeEventListener(
        "visibilitychange",
        handleOnVisibilityChange
      );
    };
  }, []);

  useEffect(() => {
    if (slides.length && visible) {
      autoStartSlide();
      updateUpNext(count);
    } else pauseSlideShow();
  }, [slides.length, visible]);

  return (
    <div className="w-full flex">
      {/* Slide Show Section  */}
      <div className="w-4/5 aspect-video relative overflow-hidden">
        <Slide
          title={currentSlide.title}
          src={currentSlide.poster}
          ref={slideRef}
          id={currentSlide.id}
        />
        {/* Cloned Slide */}
        <Slide
          onAnimationEnd={handleAnimationEnd}
          src={clonedSlide.poster}
          title={clonedSlide.title}
          ref={clonedSlideRef}
          id={currentSlide.id}
          className="absolute inset-0"
        />

        <SlideControlBtns
          onPrevSlide={handlePrevSlide}
          onNextSlide={handleNextSlide}
        />
      </div>
      {/* Up Next Section */}
      <div className="w-1/5 space-y-3 px-3">
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
        <div className="absolute inset-0 flex flex-col justify-end py-3 bg-gradient-to-t from-white dark:from-primary">
          <h1 className="font-semibold text-4xl dark:text-highlight-dark text-highlight ">
            {title}
          </h1>
        </div>
      ) : null}
    </Link>
  );
});

export default HeroSlideShow;
