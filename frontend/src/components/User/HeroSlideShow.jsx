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
    intervalId = setInterval(handleOnNextClick, 3500);
  };

  const puaseSlideShow = () => {
    clearInterval(intervalId);
  };

  // Update Up Next Section
  const handleVisibilityChange = () => {
    const visibility = document.visibilityState;
    if (visibility === "hidden") setVisible(false);
    if (visibility === "visible") setVisible(true);
  };

  // UP Next
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
  const handleOnNextClick = () => {
    setClonedSlide(slides[count]);

    count = (count + 1) % slides.length;
    setCurrentSlide(slides[count]);

    updateUpNext(count);

    slideRef.current.classList.add("slide-in-from-right");
  };

  // Prev Slide
  const handleOnPrevClick = () => {
    setClonedSlide(slides[count]);

    count = (count + slides.length - 1) % slides.length;
    setCurrentSlide(slides[count]);

    updateUpNext(count);

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

    setClonedSlide({});
  };

  useEffect(() => {
    fetchLatestUploads();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      puaseSlideShow();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    updateUpNext(count);
    if (slides.length && visible) {
      autoPlaySlide();
      updateUpNext(count);
    } else puaseSlideShow();
  }, [slides.length, visible]);

  return (
    <div className="w-full flex">
      {/* Slide Show Section  */}
      <div className="md:w-4/5 w-full aspect-video relative overflow-hidden">
        <Slide
          onAnimationEnd={handleAnimationEnd}
          title={currentSlide.title}
          id={currentSlide.id}
          ref={slideRef}
          src={currentSlide.poster}
          alt={currentSlide.title}
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
