import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { RiSlideshow3Fill } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { useAppcontext } from "../contaxt/Appcontext";

const Navbar = () => {
  const [active, setActive] = useState(1);
  // const [model, setModel] = useState(false);   //handle a model setting

  const { navigate } = useAppcontext();

  const handleLogout = () => {
    alert("LogOut");
    localStorage.clear();
    navigate("/");
  };

  //used a navlink automatic set the routes
  const activeclass = ({ isActive }) =>
    `text-2xl transition duration-200 ${
      isActive ? "text-blue-700" : "text-gray-600"
    }`;

  return (
    <>
      <div className=" w-full z-999  bg-white h-auto fixed  ">
        <header className="grid grid-cols-2 justify-between pt-2 ">
          <h2
            onClick={() => navigate("/home")}
            className="pl-2 text-3xl font-extrabold text-blue-700  "
            style={{ fontFamily: "SN Pro" }}
          >
            facebook
          </h2>
          <div className="justify-items-end-safe ">
            <HiDotsVertical className="text-3xl pt-2" onClick={handleLogout} />
          </div>
        </header>

        <nav
          style={{ textAlign: "-webkit-center" }}
          className="grid grid-cols-4 justify-center items-center p-2 text-black"
        >
          <NavLink to="/home" className={activeclass}>
            <FaHome />
          </NavLink>
          <NavLink to="/friends" className={activeclass}>
            <FaUserFriends />
          </NavLink>
          <NavLink to="/notification" className={activeclass}>
            <IoNotifications />
          </NavLink>
          <NavLink to="/trending" className={activeclass}>
            <RiSlideshow3Fill />{" "}
          </NavLink>
        </nav>
        <hr />
      </div>

      {/* Model Setting */}
    </>
  );
};

export default Navbar;
