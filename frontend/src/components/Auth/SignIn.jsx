/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const SignIn = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded space-y-4 p-6 w-72">
          <Title>SignIn 🔑</Title>
          <Input name="email" label="Email" placeholder="johnwick@gmail.com" />
          <Input name="password" label="Password" placeholder="********" />
          <Submit value="Sign In" />
          <div className="flex justify-between">
            <a
              className="text-dark-subtle hover:text-white transition"
              href="#"
            >
              Forget Password?
            </a>
            <a
              className="text-dark-subtle hover:text-white transition"
              href="#"
            >
              Sign Up
            </a>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SignIn;
