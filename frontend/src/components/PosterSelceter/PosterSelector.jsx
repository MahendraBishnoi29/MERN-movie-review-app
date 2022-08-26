import React from "react";

const commonPosterClasses =
  "flex justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle cursor-pointer";

const PosterSelector = ({ accept, name, selectedPoster, onChange }) => {
  return (
    <div>
      <input
        accept={accept}
        name={name}
        onChange={onChange}
        id={name}
        type="file"
        hidden
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            src={selectedPoster}
            className={commonPosterClasses + " object-cover"}
            alt=""
          />
        ) : (
          <PosterUI />
        )}
      </label>
    </div>
  );
};

//POSTER UI
const PosterUI = () => {
  return (
    <div className={commonPosterClasses}>
      <span className="dark:text-dark-subtle text-light-subtle">
        Select Poster
      </span>
    </div>
  );
};

export default PosterSelector;
