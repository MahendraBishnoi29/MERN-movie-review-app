import React from "react";
import { useState } from "react";
import CustomLink from "../CustomLink/CustomLink";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const OTP_LENGTH = 6;

const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));

  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded space-y-3 p-6 ">
          <div>
            <Title>Enter the OTP to Verify Your Account</Title>
            <p className="text-center text-dark-subtle">
              OTP has been sent to your Email
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, i) => {
              return (
                <input
                  key={i}
                  type="number"
                  className="text-white border-dark-subtle text-xl font-semibold w-12 h-12 border-2 bg-transparent focus:border-white rounded outline-none text-center"
                />
              );
            })}
          </div>

          <Submit value="Send Link" />
        </form>
      </Container>
    </div>
  );
};

export default EmailVerification;
