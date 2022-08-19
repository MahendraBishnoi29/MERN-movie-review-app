import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import Container from "../Navbar/Container";

const Home = () => {
  const { authInfo } = useAuth();
  const navigate = useNavigate();

  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;

  const navigateToVerification = () => {
    navigate("/email-verification", { state: { user: authInfo.profile } });
  };

  return (
    <Container>
      {isLoggedIn && !isVerified ? (
        <p className="text-2xl text-center bg-blue-50 p-3">
          Looks Like You Haven't Verified Your Account ,&nbsp;
          <button
            onClick={navigateToVerification}
            className="text-blue-500 font-semibold hover:underline"
          >
            Click here to Verify :)
          </button>
        </p>
      ) : null}
    </Container>
  );
};

export default Home;
