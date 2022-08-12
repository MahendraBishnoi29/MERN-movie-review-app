import React from "react";
import { commonModalClasses } from "../../utils/theme";
import CustomLink from "../CustomLink/CustomLink";
import FormContainer from "../Form/formContainer/FormContainer";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const ForgetPassword = () => {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"}>
          <Title>Please Enter Your Email 📧</Title>
          <Input label="Email" name="email" placeholder="johnwick@gmail.com" />
          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to="/signIn">Sign In</CustomLink>
            <CustomLink to="/signUp">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default ForgetPassword;
