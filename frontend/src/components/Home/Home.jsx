import React from "react";
import Container from "../Navbar/Container";
import TopRatedMovies from "../User/TopRatedMovies";
import TopRatedTVSeries from "../User/TopRatedTVSeries";
import TopRatedWebSeries from "../User/TopRatedWebSeries";
import IsVerified from "./IsVerified";

const Home = () => {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container>
        <IsVerified />
        {/* Slider */}

        <TopRatedMovies />
        <TopRatedWebSeries />
        <TopRatedTVSeries />
      </Container>
    </div>
  );
};

export default Home;
