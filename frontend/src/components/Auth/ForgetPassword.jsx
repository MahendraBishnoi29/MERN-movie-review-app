import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword } from "../../api/auth";
import { isValidEmail } from "../../utils/helper";
import { commonModalClasses } from "../../utils/theme";
import CustomLink from "../CustomLink/CustomLink";
import FormContainer from "../Form/formContainer/FormContainer";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) return toast.error("Invalid Email!");
    const { error, message } = await forgotPassword(email);

    if (error) return toast.error(error);
    toast.success(message);
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
          <Title>Please Enter Your Email 📧</Title>
          <Input
            onChange={handleChange}
            value={email}
            label="Email"
            name="email"
            placeholder="johnwick@gmail.com"
          />
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
