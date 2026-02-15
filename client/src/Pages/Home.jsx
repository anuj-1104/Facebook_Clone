import React from "react";
import ProfileBar from "../component/ProfileBar";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import profile_image from "../assets/profile_icon.png";
import darsh from "../assets/DSC_0003.JPG";
import { HiDotsHorizontal } from "react-icons/hi";

const Home = () => {
  const dummydata = [
    {
      name: "Darsh Prajapati",
      description: "Congratulation ❤️",
      profile_image: profile_image,
      images: [darsh, darsh, darsh, darsh],
      like: 4,
      comment: ["hello"],
    },
    {
      name: "Darsh Prajapati",
      profile_image: profile_image,
      images: [darsh, darsh, darsh, darsh],
      like: 4,
      description: "Congratulation ❤️",
      comment: ["hello"],
    },
    {
      name: "Darsh Prajapati",
      profile_image: profile_image,
      images: [darsh, darsh, darsh, darsh],
      like: 4,
      description: "Congratulation ❤️",
      comment: ["hello"],
    },
    {
      name: "Darsh Prajapati",
      profile_image: profile_image,
      images: [darsh, darsh, darsh, darsh],
      like: 4,
      description: "Congratulation ❤️",
      comment: ["hello"],
    },
    {
      name: "Darsh Prajapati",
      profile_image: profile_image,
      images: [darsh, darsh, darsh, darsh],
      like: 4,
      description: "Congratulation ❤️",
      comment: ["hello"],
    },
    {
      name: "Darsh Prajapati",
      profile_image: profile_image,
      images: [darsh, darsh, darsh, darsh],
      like: 4,
      description: "Congratulation ❤️",
      comment: ["hello"],
    },
    {
      name: "Darsh Prajapati",
      profile_image: profile_image,
      images: [darsh, darsh, darsh, darsh],
      like: 4,
      description: "Congratulation ❤️",
      comment: ["hello"],
    },
    {
      name: "Darsh Prajapati",
      profile_image: profile_image,
      images: [darsh, darsh, darsh, darsh],
      like: 4,
      description: "Congratulation ❤️",
      comment: ["hello"],
    },
    {
      name: "Darsh Prajapati",
      profile_image: profile_image,
      images: [darsh, darsh, darsh, darsh],
      like: 4,
      description: "Congratulation ❤️",
      comment: ["hello"],
    },
    {
      name: "Darsh Prajapati",
      profile_image: profile_image,
      images: [darsh, darsh, darsh, darsh],
      like: 4,
      comment: ["hello"],
      description: "Congratulation ❤️",
    },
    {
      name: "Darsh Prajapati",
      profile_image: profile_image,
      images: [darsh, darsh, darsh, darsh],
      like: 4,
      comment: ["hello"],
      description: "Congratulation ❤️",
    },
    {
      name: "Darsh Prajapati",
      profile_image: profile_image,
      images: [darsh, darsh],
      like: 4,
      description: "Congratulation ❤️",
      comment: ["hello"],
    },
    {
      name: "Darsh Prajapati",
      profile_image: profile_image,
      images: [darsh, darsh],
      like: 4,
      description: "Congratulation ❤️",
      comment: ["hello"],
    },
  ];
  return (
    <div className="select-none relative  top-33 ">
      <ProfileBar />
      <div className="  h-auto  bg-white ">
        {dummydata.length > 0
          ? dummydata.map((items, key) => (
              <div key={key} className=" bg-white w-auto p-2">
                <div className=" flex flex-col-2 justify-between   bg-white  ">
                  <div className="flex gap-5 text-center">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={items.profile_image}
                      alt={items.name}
                    />
                    <p
                      style={{ fontFamily: "SN Pro" }}
                      className="font-bold align-middle  text-center"
                    >
                      {items.name}
                    </p>
                  </div>

                  <HiDotsHorizontal className=" text-2xl " />
                </div>
                {items.description}
                <div className="grid grid-cols-2 pt-3 h-auto ">
                  {items.images.map((image, index) => (
                    <img
                      onClick={() => alert("Like 👍🏻")}
                      className=""
                      key={index}
                      src={image}
                      alt={image}
                    />
                  ))}
                </div>

                <br />
                <div
                  style={{ textAlign: "-webkit-center" }}
                  className="grid grid-cols-3 p-5   bg-white"
                >
                  <p className="flex">
                    <AiOutlineLike className="text-2xl" />
                    {items.like}
                  </p>
                  <p>
                    <FaRegComment className="text-2xl " />
                    {/* {items.comment} */}
                  </p>
                  <p>
                    <RiShareForwardLine className="text-2xl" />
                    {/* share */}
                  </p>
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
