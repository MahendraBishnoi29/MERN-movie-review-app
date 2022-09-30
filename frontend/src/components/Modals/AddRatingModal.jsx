import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineStar } from "react-icons/ai";

const ratings = new Array(10).fill("");

const AddRatingModal = ({}) => {
  return (
    <ModalContainer visible ignoreContainer>
      <div className="p-5 bg-white dark:bg-primary rounded">
        <div className="text-highlight dark:text-highlight-dark flex items-center">
          {ratings.map((_, index) => {
            return <AiOutlineStar size={24} key={index} />;
          })}
        </div>
      </div>
    </ModalContainer>
  );
};

export default AddRatingModal;
