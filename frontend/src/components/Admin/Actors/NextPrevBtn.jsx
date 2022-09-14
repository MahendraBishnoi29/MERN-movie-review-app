import React from "react";

const NextPrevBtn = ({ onPrev, onNext }) => {
  return (
    <div className="flex justify-end items-center space-x-3 mt-5 pr-7">
      <button
        className="text-primary dark:text-white hover:underline"
        type="button"
        onClick={onPrev}
      >
        Prev
      </button>
      <button
        className="text-primary dark:text-white hover:underline"
        type="button"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default NextPrevBtn;
