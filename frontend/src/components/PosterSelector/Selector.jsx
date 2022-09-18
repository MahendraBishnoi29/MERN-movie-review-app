import React from "react";

const Selector = ({ name, options, value, onChange, label }) => {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-white dark:bg-primary pr-1 border-2 p-1 rounded focus:border-primary dark:border-dark-subtle dark:focus:border-white dark:text-dark-subtle text-light-subtle transition focus:text-primary dark:focus:text-white"
    >
      <option value="">{label}</option>
      {options.map(({ title, value }) => {
        return (
          <option value={value} key={title}>
            {title}
          </option>
        );
      })}
    </select>
  );
};

export default Selector;
