import React from "react";
import Container from "../Navbar/Container";
import CustomButtonLink from "../Shared/CustomButtonLink";

const MovieReviews = () => {
  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-secondary dark:text-white">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              Reviews For:{" "}
            </span>
            This is Title
          </h1>

          <CustomButtonLink label="Find My Review" />
        </div>
      </Container>
    </div>
  );
};

export default MovieReviews;
