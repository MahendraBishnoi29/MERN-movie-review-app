import React from "react";

const Selector = ({ name, options, value, onChange, label }) => {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="pr-1 border-2 dark:border-dark-subtle border-light-subtle p-1 dark:focus:border-white focus:border-primary outline-none transition rounded bg-tranparent text-light-subtle dark:text-dark-subtle dark:focus:text-white focus:text-primary"
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
