import React from "react";
import { useAuth } from "../../hooks";
import Container from "../Navbar/Container";

const Home = () => {
  const { authInfo } = useAuth();
  console.log(authInfo);

  return (
    <Container>
      <p className="text-2xl text-center bg-blue-50 p-3">
        Looks Like You Haven't Verified Your Account ,&nbsp;
        <button className="text-blue-500 font-semibold hover:underline">
          Click here to Verify :)
        </button>
      </p>
    </Container>
  );
};

export default Home;
