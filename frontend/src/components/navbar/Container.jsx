import React from "react";

const Container = ({ children, className }) => {
  return (
    <div>
      <div className={"max-w-screen-xl mx-auto " + className}>{children}</div>
    </div>
  );
};

export default Container;
