import React, { useState } from "react";
import {  NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { RiSlideshow3Fill } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { useAppcontext } from "../contaxt/Appcontext";

const Navbar = () => {
  const [active, setActive] = useState(false);
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
      <div className="z-999 w-full bg-white h-auto fixed  ">
        <div className="max-w-2xl mx-auto  ">
          <header className="flex justify-between items-center pt-2 px-2 relative">
            <h2
              onClick={() => navigate("/home")}
              className="text-3xl font-extrabold text-blue-700"
              style={{ fontFamily: "SN Pro" }}
            >
              facebook
            </h2>

            <div className="relative">
              <button onClick={() => setActive(!active)}>
                <HiDotsVertical className="text-3xl" />
              </button>

              {active && (
                <div className="absolute right-0 border  bg-white shadow-xl rounded w-28 ">
                  <div className="p-1 w-full">
                    <button
                      title="Logout"
                      onClick={handleLogout}
                      className="hover:bg-black/10 gap-7 text-center flex duration-300 w-full font-medium hover:text-blue-600  cursor-pointer"
                    >
                      Logout
                      <IoLogOutOutline className="text-2xl hover:text-blue-600" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </header>

          <nav
            style={{ textAlign: "-webkit-center" }}
            className="grid grid-cols-4 justify-center items-center p-2 text-black"
          >
            <NavLink to="/home" className={activeclass} title="Home">
              <FaHome />
            </NavLink>
            <NavLink to="/friends" className={activeclass} title="Friends">
              <FaUserFriends />
            </NavLink>
            <NavLink
              to="/notification"
              className={activeclass}
              title="Notification"
            >
              <IoNotifications />
            </NavLink>
            <NavLink to="/trending" className={activeclass} title="Videos">
              <RiSlideshow3Fill />{" "}
            </NavLink>
          </nav>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Navbar;
