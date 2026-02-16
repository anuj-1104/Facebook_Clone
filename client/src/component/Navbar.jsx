import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { RiSlideshow3Fill } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { useAppcontext } from "../contaxt/Appcontext";

const Navbar = () => {
  const [active, setActive] = useState(1);
  // const [model, setModel] = useState(false);   //handle a model setting

  const { token, navigate } = useAppcontext();

  const handleLogout = () => {
    alert("Logout !");
    localStorage.clear();
    navigate("/");
  };

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
            <HiDotsVertical
              className="text-3xl pt-2"
              // onClick={() => setModel((prev) => !prev)} //change a any satge true/false
              onClick={handleLogout}
            />
          </div>
        </header>

        <nav
          style={{ textAlign: "-webkit-center" }}
          className="grid grid-cols-4 justify-center items-center p-2 text-black"
        >
          <Link to={"/home"} onClick={() => setActive(1)}>
            <FaHome
              className={`text-2xl ${active === 1 ? "text-blue-700" : "text-black"}  focus:text-blue-700`}
            />
          </Link>
          <Link to={"/friends"} onClick={() => setActive(2)}>
            <FaUserFriends
              className={`text-2xl ${active === 2 ? "text-blue-700" : "text-black"}  focus:text-blue-700`}
            />
          </Link>
          <Link to={"/notification"} onClick={() => setActive(3)}>
            <IoNotifications
              className={`text-2xl ${active === 3 ? "text-blue-700" : "text-black"}  focus:text-blue-700`}
            />
          </Link>
          <Link to={"/treading"} onClick={() => setActive(4)}>
            <RiSlideshow3Fill
              className={`text-2xl ${active === 4 ? "text-blue-700" : "text-black"}  focus:text-blue-700`}
            />{" "}
          </Link>
        </nav>
        <hr />
      </div>

      {/* Model Setting */}
    </>
  );
};

export default Navbar;
