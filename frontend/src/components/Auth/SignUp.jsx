/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/auth";
import { useNotification } from "../../hooks";
import { commonModalClasses } from "../../utils/theme";
import CustomLink from "../CustomLink/CustomLink";
import FormContainer from "../Form/formContainer/FormContainer";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

// Validating User Fields
const validateUserInfo = ({ name, email, password }) => {
  const isValidName = /^[a-z A-Z]+$/;
  // eslint-disable-next-line no-useless-escape
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!name.trim()) return { ok: false, error: "Name is Missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid Name" };

  if (!email.trim()) return { ok: false, error: "Please Enter Your Email" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid Email" };

  if (!password.trim())
    return { ok: false, error: "Please Enter Your Password" };
  if (password.length < 8)
    return { ok: false, error: "Password Must Be 8 Characters Long" };

  return { ok: true };
};

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification("error", error);

    const res = await createUser(userInfo);
    updateNotification("success", res.message);

    navigate("/email-verification", {
      state: { user: res.user },
      replace: true,
    });

    if (res.error) {
      return updateNotification(res.error);
    } else {
      console.log(res.user);
    }
  };

  const { name, email, password } = userInfo;

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>SignUp 🐛</Title>
          <Input
            onChange={handleChange}
            value={name}
            name="name"
            label="Name"
            placeholder="John Wick"
          />
          <Input
            onChange={handleChange}
            value={email}
            name="email"
            label="Email"
            placeholder="johnwick@gmail.com"
          />
          <Input
            onChange={handleChange}
            value={password}
            name="password"
            label="Password"
            type="password"
            placeholder="********"
          />
          <Submit value="Sign Up" />
          <div className="flex justify-between">
            <CustomLink to="/forget-password">Forget Password?</CustomLink>
            <CustomLink to="/signIn">Sign In</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignUp;
