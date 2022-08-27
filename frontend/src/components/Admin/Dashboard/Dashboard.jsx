import React from "react";
import MovieUpload from "../Upload/MovieUpload";

let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func().apply(null, ...args);
    }, delay);
  };
};

const Dashboard = () => {
  return (
    <div className="p-14">
      <input type="text" className="border border-gray-500" />
    </div>
  );
};

export default Dashboard;
