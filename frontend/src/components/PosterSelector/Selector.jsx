import React from "react";

const Selector = ({ name, options, value, onChange, label }) => {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="pr-1 border-2 p-1 rounded focus:border-primary dark:focus:border-white dark:text-light-subtle text-light-subtle transition focus:text-primary dark:focus:text-primary"
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
