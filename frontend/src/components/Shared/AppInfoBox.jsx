import React from "react";

const AppInfoBox = ({ title, subtitle }) => {
  return (
    <div className="bg-white shadow-lg dark:shadow-lg dark:bg-secondary p-5 rounded">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        {title}
      </h1>
      <p className="text-xl text-primary dark:text-white">{subtitle}</p>
    </div>
  );
};

export default AppInfoBox;
