import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const navigate = useNavigate();

  const handleLogIn = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await SignInUser({ email, password });

    if (error) {
      toast.error(error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    navigate("/");
    toast.success("Signed In 🎉");

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

    if (error) {
      toast.error(error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }
    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({
      ...defaultAuthInfo,
    });
    navigate("/");
    toast.success("Logged Out");
  };

  useEffect(() => {
    isAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogIn, isAuth, handleLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
