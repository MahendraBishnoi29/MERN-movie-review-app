import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

const IsVerified = () => {
  const { authInfo } = useAuth();
  const navigate = useNavigate();

  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;

  const navigateToVerification = () => {
    navigate("/email-verification", { state: { user: authInfo.profile } });
  };

  return (
    <div>
      {isLoggedIn && !isVerified ? (
        <p className="text-2xl text-center bg-blue-50 p-3">
          Looks Like You Haven't Verified Your Account ,{" "}
          <button
            onClick={navigateToVerification}
            className="text-blue-500 font-semibold hover:underline"
          >
            Click here to Verify :)
          </button>
        </p>
      ) : null}
    </div>
  );
};

export default IsVerified;
