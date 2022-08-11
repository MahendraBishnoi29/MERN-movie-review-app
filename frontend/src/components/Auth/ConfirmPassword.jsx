import React from "react";
import CustomLink from "../CustomLink/CustomLink";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const ConfirmPassword = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded space-y-4 p-6 w-80">
          <Title>Enter New Password</Title>
          <Input
            name="password"
            label="New Password"
            placeholder="new password"
            type="password"
          />
          <Input
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="confirm password"
            type="password"
          />
          <Submit value="Save Password" />
        </form>
      </Container>
    </div>
  );
};

export default ConfirmPassword;
