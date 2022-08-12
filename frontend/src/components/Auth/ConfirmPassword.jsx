import React from "react";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../Form/formContainer/FormContainer";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const ConfirmPassword = () => {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-80"}>
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
    </FormContainer>
  );
};

export default ConfirmPassword;
