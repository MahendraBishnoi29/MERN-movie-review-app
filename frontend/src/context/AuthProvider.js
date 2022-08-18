import React, { createContext, useState } from "react";
import { SignInUser } from "../api/auth";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });

  const handleLogIn = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await SignInUser({ email, password });

    if (error) {
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });

    console.log(setAuthInfo);

    localStorage.setItem("auth-token", user.token);
  };

  return (
    <AuthContext.Provider value={{ authInfo, handleLogIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
