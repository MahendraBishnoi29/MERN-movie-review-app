import React from "react";

const Input = ({ name, placeholder, label, ...rest }) => {
  return (
    <div className="flex flex-col-reverse">
      <input
        name={name}
        id="email"
        className="text-white outline-none bg-transparent rounded border-2 border-dark-subtle  w-full focus:border-white p-1 transition peer"
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="font-semibold text-dark-subtle peer-focus:text-white self-start mb-1"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
