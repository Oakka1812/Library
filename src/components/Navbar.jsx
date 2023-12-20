import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import lightIcon from "../assets/light.svg";
import darkIcon from "../assets/dark.svg";
import useSignOut from "../hooks/useSignOut";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {

  // let params = new URLSearchParams(location.search);
  // let searchValue = params.get("search");
  let [search, setSearch] = useState("");
  let navigate = useNavigate();
  let { user } = useContext(AuthContext);

  let searchHandler = () => {
    navigate("/?search=" + search);
    setSearch("");
  };
  let { isDark, changeTheme } = useTheme();

  let { logout } = useSignOut();

  let signOutUser = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <nav
      className={`border border-b-1 ${
        isDark ? "bg-dbg border-primary" : "bg-white"
      }`}
    >
      <ul className="flex justify-between items-center p-3 max-w-5xl m-auto">
        <li className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            type="text"
            placeholder="search books..."
            className="outline-none py-1 px-2 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={searchHandler}
            className=" bg-primary text-white py-2 px-3 rounded-xl flex gap-1 items-center"
          >
            <span className="hidden md:block">Search</span>
          </button>
        </li>
        <Link
          to="/"
          className="flex items-center gap-3 md:-ml-36 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>

          <span className="text-2xl font-bold text-primary hidden md:block">
            BookStore
          </span>
        </Link>
        <li className="flex gap-3 items-center">
          <Link
            to="/create"
            className=" bg-primary text-white py-2 px-3 rounded-xl flex gap-1 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span className="hidden md:block">Create</span>
          </Link>
          <div className="w-11">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf5hOTNTGcqhOcKbSt8g3ppgK5rhBS7dyj8A&usqp=CAU"
              alt=""
              className="w-full rounded-full"
            />
          </div>
          <div className="cursor-pointer">
            {isDark && (
              <img
                src={lightIcon}
                alt=""
                className="w-8"
                onClick={() => changeTheme("light")}
              />
            )}
            {!isDark && (
              <img
                src={darkIcon}
                alt=""
                className="w-8"
                onClick={() => changeTheme("dark")}
              />
            )}
          </div>
          {!user && (
            <>
              <Link
                to={"/login"}
                className=" text-black border border-primary py-2 px-2 rounded-md text-sm cursor-pointer"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="bg-primary text-white py-2 px-2 rounded-md text-sm cursor-pointer"
              >
                Register
              </Link>
            </>
          )}
          {user && (
            <div
              onClick={signOutUser}
              className="bg-red-500 text-white py-2 px-2 rounded-md text-sm cursor-pointer"
            >
              Logout
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
