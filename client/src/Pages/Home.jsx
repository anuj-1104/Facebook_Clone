import React, { useEffect } from "react";
import ProfileBar from "../component/ProfileBar";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import axios from "../api/axios";

const Home = () => {
  const [open, setOpen] = useState(null);
  const [active, setActive] = useState(null);
  const [friendspost, setFriendsPost] = useState([]);

  const handlerlikes = async (id) => {
    try {
      const response = await axios.patch("api/user/like/id", { id }); //used only end point

      if (response.status === 200) {
        setActive(id);
      }
    } catch (error) {
      console.log(`error: ${error}`);
      setActive(null);
    }
  };

  useEffect(() => {
    const handlePost = async () => {
      const response = await axios.get("api/user/all/post");

      if (response.status === 200) {
        setFriendsPost(response.data.data);
      }
    };

    handlePost();
  }, [active]);

  return (
    <div className="select-none relative  top-33">
      <ProfileBar />
      <div className=" bg-white">
        {friendspost.length > 0
          ? friendspost.map((items) => (
              <div key={items._id} className=" bg-white w-auto p-2 over">
                <div className=" flex flex-col-2 justify-between   bg-white  ">
                  <div className="flex gap-5 text-center">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`http://localhost:8080/${items.profile_image}`}
                      alt={items.user_name}
                    />
                    <p
                      style={{ fontFamily: "SN Pro" }}
                      className="font-bold align-middle relative top-2  text-center"
                    >
                      {items.user_name}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setOpen((prev) => (prev === items._id ? null : items._id))
                    }
                  >
                    <HiDotsHorizontal className=" text-2xl " />
                  </button>
                  {open === items._id && (
                    <div className="absolute content-end p-2 font-medium bg-white  justify-items-center-safe h-auto outline-1 right-0 w-36  mt-6 m-2">
                      <p
                        className="text-red-500 "
                        onClick={() => [alert(items.user_name), setOpen(null)]} //only dummy purpose
                      >
                        Block User
                      </p>
                      <p>report</p>
                      <p>report</p>
                    </div>
                  )}
                </div>
                {items.description}
                <div className="  grid grid-cols-2 pt-3 h-auto ">
                  {items.image_url.map((image, index) => (
                    <img
                      onDoubleClick={() => handlerlikes(items._id)}
                      className=""
                      key={index}
                      src={`http://localhost:8080/${image}`}
                      alt={image}
                    />
                  ))}
                </div>

                <br />
                <div
                  style={{ textAlign: "-webkit-center" }}
                  className="grid grid-cols-3 pt-3 pb-3  justify-items-center-safe   bg-white"
                >
                  <button
                    className="flex"
                    onClick={() => handlerlikes(items._id)}
                  >
                    {/* Items.likedbyuser manage */}
                    {active === items._id ? (
                      <AiFillLike className="text-2xl text-blue-600" />
                    ) : (
                      <AiOutlineLike className="text-2xl " />
                    )}
                    {items.like}
                  </button>
                  <button className="justify-items-center-safe">
                    <FaRegComment className="text-2xl" />

                    {/* Handle a comment function */}
                    {items.comment}
                  </button>
                  <button className=" justify-items-center-safe">
                    <RiShareForwardLine className="text-2xl" />
                  </button>
                </div>
                <hr />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Home;

//manage this page wednesday18
