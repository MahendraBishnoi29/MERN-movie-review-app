import React from "react";
import Container from "../../navbar/Container";

const SignIn = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72">
          <h1 className="text-xl text-white font-semibold text-center">
            SignIn 🔑
          </h1>
          <div className="flex flex-col-reverse">
            <input
              type="text"
              id="email"
              className="text-white outline-none bg-transparent rounded border-2 border-dark-subtle  w-full focus:border-white p-1 transition peer"
              placeholder="John@gmail.com"
            />
            <label
              className="font-semibold text-dark-subtle peer-focus:text-white self-start mb-1"
              htmlFor="email"
            >
              Email
            </label>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SignIn;
