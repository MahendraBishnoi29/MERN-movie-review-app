/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../Form/formContainer/FormContainer";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const ConfirmPassword = () => {
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
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

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.newPassword)
      return toast.error("Please Enter Your New Password!");

    if (password.newPassword.trim().length < 6)
      return toast.error("Password Must be 6 Character Long..");

    if (password.newPassword !== password.confirmPassword)
      return toast.error("Password Do Not Match!");

    const { error, message } = await resetPassword({
      newPassword: password.newPassword,
      userId: id,
      token,
    });

    if (error) return toast.error(error);

    toast.success(message);
    navigate("/signIn", { replace: true });
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
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-80"}>
          <Title>Enter New Password</Title>
          <Input
            value={password.newPassword}
            onChange={handleChange}
            name="newPassword"
            label="New Password"
            placeholder="new password"
            type="password"
          />
          <Input
            value={password.confirmPassword}
            onChange={handleChange}
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
