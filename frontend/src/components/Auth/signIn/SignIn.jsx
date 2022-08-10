import React from "react";
import Input from "../../Form/Input";
import Title from "../../Form/Title.tsx";
import Container from "../../navbar/Container";

const SignIn = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded space-y-4 p-6 w-72">
          <Title>SignIn 🔑</Title>
          <Input name="email" label="Email" placeholder="johnwick@gmail.com" />
          <Input name="password" label="Password" placeholder="********" />
        </form>
      </Container>
    </div>
  );
};

export default SignIn;
