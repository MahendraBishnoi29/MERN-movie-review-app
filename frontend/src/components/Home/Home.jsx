import React from "react";
import Container from "../Navbar/Container";
import HeroSlideShow from "../User/HeroSlideShow";
import TopRatedMovies from "../User/TopRatedMovies";
import TopRatedTVSeries from "../User/TopRatedTVSeries";
import TopRatedWebSeries from "../User/TopRatedWebSeries";
import IsVerified from "./IsVerified";

const Home = () => {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className="px-2 xl:p-0">
        <IsVerified />
        {/* Slider */}
        <HeroSlideShow />
        <div className="space-y-3 py-8">
          <TopRatedMovies />
          <TopRatedWebSeries />
          <TopRatedTVSeries />
        </div>
      </Container>
    </div>
  );
};

export default Home;
