import React from "react";

const commonPosterClasses =
  "flex justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle cursor-pointer";

const PosterSelector = ({
  accept,
  name,
  selectedPoster,
  onChange,
  className,
  label,
}) => {
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
            className={commonPosterClasses + " object-cover " + className}
            alt=""
          />
        ) : (
          <PosterUI label={label} className={className} />
        )}
      </label>
    </div>
  );
};

//POSTER UI
const PosterUI = ({ label, className }) => {
  return (
    <div className={commonPosterClasses + " " + className}>
      <span className="dark:text-dark-subtle text-light-subtle">{label}</span>
    </div>
  );
};

export default PosterSelector;
