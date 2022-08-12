import React from "react";

const Input = ({ name, placeholder, label, ...rest }) => {
  return (
    <div className="flex flex-col-reverse">
      <input
        name={name}
        id="email"
        className="dark:text-white outline-none bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle  w-full dark:focus:border-white focus:border-primary p-1 transition peer"
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="font-semibold 
        text-light-subtle
        dark:text-dark-subtle dark:peer-focus:text-white peer-focus:text-primary self-start mb-1 transition"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
