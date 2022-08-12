/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import CustomLink from "../CustomLink/CustomLink";
import FormContainer from "../Form/formContainer/FormContainer";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
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
