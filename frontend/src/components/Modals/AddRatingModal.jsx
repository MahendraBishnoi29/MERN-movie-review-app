import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineStar } from "react-icons/ai";
import Submit from "../Form/Submit";

const ratings = new Array(10).fill("");

const AddRatingModal = ({}) => {
  return (
    <ModalContainer visible ignoreContainer>
      <div className="p-5 bg-white dark:bg-primary rounded space-y-3">
        <div className="text-highlight dark:text-highlight-dark flex items-center">
          {ratings.map((_, index) => {
            return <AiOutlineStar size={24} key={index} />;
          })}
        </div>
        <textarea className="w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent resize-none"></textarea>
        <Submit value="Rate This Movie" />
      </div>
    </ModalContainer>
  );
};

export default AddRatingModal;
