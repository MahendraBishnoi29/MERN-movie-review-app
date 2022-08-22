import React from "react";
import { Link, NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <nav className="w-48 min-h-screen bg-secondary border-r border-gray-300">
      <ul className="pl-4">
        <li className="">
          <Link to="/">
            <img src="./logo2.png" alt="logo" className="h-14 p-2" />
          </Link>
        </li>

        <li>
          <NavItem to="/">Home</NavItem>
        </li>
        <li>
          <NavItem to="/movies">Movies</NavItem>
        </li>
        <li>
          <NavItem to="/actors">Actors</NavItem>
        </li>
      </ul>
    </nav>
  );
};

const NavItem = ({ children, to }) => {
  return (
    <NavLink
      className={(isActive) => (isActive ? "text-white" : "text-gray-400")}
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default Dashboard;
