import React from "react";
import CustomLink from "../CustomLink/CustomLink";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const ForgetPassword = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded space-y-4 p-6 w-96">
          <Title>Please Enter Your Email 📧</Title>
          <Input label="Email" name="email" placeholder="johnwick@gmail.com" />
          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to="/signIn">Sign In</CustomLink>
            <CustomLink to="/signUp">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default ForgetPassword;
