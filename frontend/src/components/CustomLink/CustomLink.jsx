import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="dark:text-dark-subtle text-light-subtle hover:text-primary dark:hover:text-white transition"
    >
      {children}
    </Link>
  );
};

export default CustomLink;
