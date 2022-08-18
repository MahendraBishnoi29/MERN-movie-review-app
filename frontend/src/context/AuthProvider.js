import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { getIsAuth, SignInUser } from "../api/auth";

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

    localStorage.setItem("auth-token", user.token);
  };

  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    setAuthInfo({ ...authInfo, isPending: true });

    const { error, user } = await getIsAuth(token);

    if (error) return setAuthInfo({ ...authInfo, isPending: false, error });
    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authInfo, handleLogIn, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
