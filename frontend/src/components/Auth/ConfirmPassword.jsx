import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyPasswordResetToken } from "../../api/auth";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../Form/formContainer/FormContainer";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const ConfirmPassword = () => {
  // http://localhost:3000/reset-password?token=a24d829a36c1de6d961012fa8cd99aa096cce9c500b6a346085950b5e5f1&id=62ff7398daa1e2162d492434

  const [verifying, setVerifying] = useState(true);
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setVerifying(false);
    if (error) {
      toast.error(error);
      return navigate("/reset-password", { replace: true });
    }

    if (!valid) {
      setValid(false);
      setVerifying(false);
    }

    setValid(true);
  };

  if (verifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h2 className="text-3xl font-semibold dark:text-white text-primary">
              Verifying Your Token
            </h2>
            <ImSpinner3 className="animate-spin text-3xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );

  if (!valid)
    return (
      <FormContainer>
        <Container>
          <h2 className="text-3xl font-semibold dark:text-white text-primary">
            Sorry the Token Is Invalid!
          </h2>
        </Container>
      </FormContainer>
    );

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
