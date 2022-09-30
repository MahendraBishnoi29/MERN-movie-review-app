import React from "react";
import ModalContainer from "./ModalContainer";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Submit from "../Form/Submit";
import { useState } from "react";

const ratings = new Array(10).fill("");

const AddRatingModal = ({}) => {
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleMouseEnter = (index) => {
    const ratings = new Array(index + 1).fill(index);
    setSelectedRatings([...ratings]);
  };

  return (
    <ModalContainer visible ignoreContainer>
      <div className="p-5 bg-white dark:bg-primary rounded space-y-3">
        <div className="text-highlight dark:text-highlight-dark flex items-center relative">
          {ratings.map((_, index) => {
            return (
              <AiOutlineStar
                onMouseEnter={() => handleMouseEnter(index)}
                className="cursor-pointer"
                size={24}
                key={index}
              />
            );
          })}
          <div className="flex items-center absolute top-1/2 -translate-y-1/2">
            {selectedRatings.map((_, index) => {
              return (
                <AiFillStar
                  onMouseEnter={() => handleMouseEnter(index)}
                  className="cursor-pointer"
                  size={24}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <textarea className="w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent resize-none"></textarea>
        <Submit value="Rate This Movie" />
      </div>
    </ModalContainer>
  );
};

export default AddRatingModal;
