import React from "react";
import { ImSpinner3 } from "react-icons/im";

const Submit = ({ value, busy, type, onClick }) => {
  return (
    <button
      type={type || "submit"}
      onClick={onClick}
      className="cursor-pointer w-full bg-secondary dark:text-secondary rounded dark:bg-white text-white hover:bg-opacity-80 transition font-semibold text-lg h-10 flex justify-center items-center"
    >
      {busy ? <ImSpinner3 className="animate-spin" /> : value}
    </button>
  );
};

export default Submit;
