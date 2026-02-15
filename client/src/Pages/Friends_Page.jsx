import React from "react";
import profile_img from "../assets/profile_icon.png";

const Friends_Page = () => {
  const dummyfiends = [
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
  ];

  return (
    <div className="relative top-20 border ">
      {dummyfiends.length > 0 ? (
        dummyfiends.map((items, key) => (
          <div key={key} className="bg-gray-300 m-2">
            <div className="p-5  h-auto w-full flex gap-5">
              <img
                src={items.profile_img}
                alt={items.profile_img}
                className="w-10 h-10 rounded-full"
              />

              <p>{items.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 p-2">
              <button className="text-white bg-blue-700 p-2 rounded-3xl ">
                Add friend
              </button>
              <button className="text-white bg-gray-400 p-2 rounded-3xl ">
                Remove
              </button>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <div>
          <p>Not Found</p>
        </div>
      )}
    </div>
  );
};

export default Friends_Page;
