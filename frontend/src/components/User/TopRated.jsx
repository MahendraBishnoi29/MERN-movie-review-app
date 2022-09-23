import React from "react";
import GridContainer from "../Shared/GridContainer";

const TopRated = () => {
  return (
    <GridContainer>
      {Array(5)
        .fill("")
        .map((_, index) => {
          return <div className="p-5 bg-red-200" key={index}></div>;
        })}
    </GridContainer>
  );
};

export default TopRated;
