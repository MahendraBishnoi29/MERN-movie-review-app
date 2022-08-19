/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
import { commonModalClasses } from "../../utils/theme";
import CustomLink from "../CustomLink/CustomLink";
import FormContainer from "../Form/formContainer/FormContainer";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Please Enter Your Email" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid Email" };

  if (!password.trim())
    return { ok: false, error: "Please Enter Your Password" };
  if (password.length < 6) return { ok: false, error: "Wrong Password!" };

  return { ok: true };
};

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { handleLogIn, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return toast.error(error);

    handleLogIn(userInfo.email, userInfo.password);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>SignIn 🔑</Title>
          <Input
            onChange={handleChange}
            value={userInfo.email}
            name="email"
            label="Email"
            placeholder="johnwick@gmail.com"
          />
          <Input
            onChange={handleChange}
            value={userInfo.password}
            name="password"
            type="password"
            label="Password"
            placeholder="********"
          />
          <Submit value="Sign In" busy={isPending} />
          <div className="flex justify-between">
            <CustomLink to="/forget-password">Forget Password?</CustomLink>
            <CustomLink to="/signUp">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignIn;
