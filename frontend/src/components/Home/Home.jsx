import React from "react";
import Container from "../Navbar/Container";
import TopRated from "../User/TopRated";
import IsVerified from "./IsVerified";

const Home = () => {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container>
        <IsVerified />
        {/* Slider */}

        <TopRated />
      </Container>
    </div>
  );
};

export default Home;
