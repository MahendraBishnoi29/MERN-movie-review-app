import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ to, children }) => {
  return (
    <Link to={to} className="text-dark-subtle hover:text-white transition">
      {children}
    </Link>
  );
};

export default CustomLink;
