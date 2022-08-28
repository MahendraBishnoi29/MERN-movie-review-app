import React from "react";
import MovieUpload from "../Upload/MovieUpload";

let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const Dashboard = () => {
  const search = (value) => {
    console.log(value);
  };

  const debounceSeach = debounce(search, 500);

  const handleChange = ({ target }) => {
    debounceSeach(target.value);
  };

  return (
    <div className="p-14">
      <input
        onChange={handleChange}
        type="text"
        className="border border-gray-500"
      />
    </div>
  );
};

export default Dashboard;
