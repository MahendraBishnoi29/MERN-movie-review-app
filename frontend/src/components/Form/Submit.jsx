import React from "react";

const Submit = ({ value }) => {
  return (
    <input
      type="submit"
      className="cursor-pointer p-1 w-full rounded bg-white hover:bg-opacity-80 transition font-semibold text-lg"
      value={value}
    />
  );
};

export default Submit;
