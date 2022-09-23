import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={"max-w-screen-xl mx-auto px-2 xl:p-0 " + className}>
      {children}
    </div>
  );
};

export default Container;
