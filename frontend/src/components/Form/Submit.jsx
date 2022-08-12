import React from "react";

const Submit = ({ value }) => {
  return (
    <input
      type="submit"
      className="cursor-pointer p-1 w-full bg-secondary dark:text-secondary rounded dark:bg-white text-white hover:bg-opacity-80 transition font-semibold text-lg"
      value={value}
    />
  );
};

export default Submit;
