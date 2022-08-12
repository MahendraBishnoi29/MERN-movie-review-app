/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { commonModalClasses } from "../../utils/theme";
import CustomLink from "../CustomLink/CustomLink";
import FormContainer from "../Form/formContainer/FormContainer";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const SignUp = () => {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-72"}>
          <Title>SignUp 🐛</Title>
          <Input name="name" label="Name" placeholder="John Wick" />
          <Input name="email" label="Email" placeholder="johnwick@gmail.com" />
          <Input name="password" label="Password" placeholder="********" />
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
