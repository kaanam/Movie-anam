import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { GoSearch } from 'react-icons/go';
import Movielist from "../Movielist.svg"

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <img src={Movielist} className="p-4" alt="Movielist"></img>
      </Link>

      <div>
        <form className="search_btn h-[32px] p-4 flex items-center rounded-full cursor-pointer outline outline-offset-2 outline-red-500 hover:outline-red-400 text-white font-bold">  
          <input
            className="md:w-[300px] w-[200px] focus:outline-none"
            type="input"
            placeholder="What do you want to watch?"
          />
          <GoSearch className="text-xl text-white"/>
        </form>
      </div>

      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="text-[#FFFDE3] pr-4">Account</button>
          </Link>
          <button
            onClick={handleLogOut}
            className="text-[#FFFDE3] px-6 py-2 rounded cursor-pointer bg-cyan-600 "
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="p-2">
          <Link to="/login">
            <button className="text-red-500 rounded-full cursor-pointer outline outline-offset-2 outline-red-500 hover:outline-red-400 font-semibold hover:text-red-400 px-7 py-1 mr-3 ">Login</button>
          </Link>
          <Link to="/register">
            <button className="text-[#FFFDE3] font-semibold px-6 py-2.5 rounded-full cursor-pointer bg-red-500 hover:bg-red-400">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
