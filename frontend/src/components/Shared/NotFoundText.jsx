import React from "react";

const NotFoundText = ({ text, visible }) => {
  if (!visible) return null;

  return (
    <h1 className="font-semibold text-3xl text-secondary dark:text-white text-center py-5 opacity-40 animate-pulse">
      {text}
    </h1>
  );
};

export default NotFoundText;
