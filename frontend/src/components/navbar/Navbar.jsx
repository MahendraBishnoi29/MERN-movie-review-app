import React from "react";
import SearchInputForm from "../Shared/SearchInputForm";
import Container from "./Container";
import { BsFillSunFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";

const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogOut } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/movie/search?title=${query}`);
  };

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src="./logo2.png"
              className="cursor-pointer sm:h-10 h-8"
              alt="appLogo"
            />
          </Link>

          <ul className="flex items-center sm:space-x-4 space-x-2">
            <li>
              <button
                onClick={toggleTheme}
                className="dark:bg-white  bg-dark-subtle p-1 rounded sm:text-2xl text-lg"
              >
                <BsFillSunFill className="text-secondary" />
              </button>
            </li>
            <li>
              <SearchInputForm
                onSubmit={handleSearch}
                placeholder="Search..."
                inputClassName="border-dark-subtle text-white focus:border-white sm:w-auto w-40 sm:text-lg"
              />
            </li>
            {isLoggedIn ? (
              <button
                onClick={handleLogOut}
                className="text-white font-semibold text-lg "
              >
                Log Out
              </button>
            ) : (
              <Link className="text-white font-semibold text-lg " to="/signIn">
                <li>Log In</li>
              </Link>
            )}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
