import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../Form/formContainer/FormContainer";
import Submit from "../Form/Submit";
import Title from "../Form/Title";
import Container from "../Navbar/Container";

const OTP_LENGTH = 6;

const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef();

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;

    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(index);
    else focusNextInputField(index);

    setOtp([...newOtp]);
  };

  const handleKeyDown = ({ key }, index) => {
    if (key === "Backspace") {
      focusPrevInputField(index);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses}>
          <div>
            <Title>Enter the OTP to Verify Your Account</Title>
            <p className="text-center text-light-subtle dark:text-dark-subtle">
              OTP has been sent to your Email
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, i) => {
              return (
                <input
                  value={otp[i] || ""}
                  ref={activeOtpIndex === i ? inputRef : null}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onChange={(e) => handleOtpChange(e, i)}
                  key={i}
                  type="number"
                  className="dark:text-white text-primary border-light-subtle dark:border-dark-subtle text-xl font-semibold w-12 h-12 border-2 bg-transparent dark:focus:border-white focus:border-primary rounded outline-none text-center mb-2"
                />
              );
            })}
          </div>

          <Submit value="Send Link" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
