import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Submit from "../Form/Submit";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

const createArray = (count) => {
  return new Array(count).fill("");
};

const ratings = createArray(10);

const RatingForm = ({ onSubmit, busy, initialState }) => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");

  const handleMouseEnter = (index) => {
    const ratings = createArray(index + 1);
    setSelectedRatings([...ratings]);
  };

  const handleOnChange = ({ target }) => {
    setContent(target.value);
  };

  const handleSubmit = () => {
    if (!selectedRatings.length)
      return toast.error("Choose ⭐ from 1 to 10 & Write Your Review!");
    const data = {
      rating: selectedRatings.length,
      content,
    };
    onSubmit(data);
  };

  useEffect(() => {
    if (initialState) {
      setContent(initialState.content);
      setSelectedRatings(createArray(initialState.rating));
    }
  }, [initialState]);

  return (
    <div>
      <div className="p-5 bg-white dark:bg-primary rounded space-y-3">
        <div className="text-highlight dark:text-highlight-dark flex items-center relative">
          <StarsOutlined
            ratings={ratings}
            handleMouseEnter={handleMouseEnter}
          />
          <div className="flex items-center absolute top-1/2 -translate-y-1/2">
            <StarsFilled
              ratings={selectedRatings}
              handleMouseEnter={handleMouseEnter}
            />
          </div>
        </div>
        <textarea
          value={content}
          onChange={handleOnChange}
          className="w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent resize-none"
        ></textarea>
        <Submit busy={busy} onClick={handleSubmit} value="Rate This Movie" />
      </div>
    </div>
  );
};

const StarsOutlined = ({ ratings, handleMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <AiOutlineStar
        onMouseEnter={() => handleMouseEnter(index)}
        className="cursor-pointer"
        size={24}
        key={index}
      />
    );
  });
};

const StarsFilled = ({ ratings, handleMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <AiFillStar
        onMouseEnter={() => handleMouseEnter(index)}
        className="cursor-pointer"
        size={24}
        key={index}
      />
    );
  });
};

export default RatingForm;
