import React from "react";
import profile_image from "../assets/profile_icon.png";
import { useAppcontext } from "../contaxt/Appcontext";

const FriendsList = () => {
  const { user } = useAppcontext();

  const data = [
    {
      name: "jay bhoi",
      profile_image: profile_image,
    },
    {
      name: "jay  bhoi",
      profile_image: profile_image,
    },
    {
      name: "jay  bhoi",
      profile_image: profile_image,
    },
    {
      name: "jay  bhoi",
      profile_image: profile_image,
    },
    {
      name: "jay  bhoi",
      profile_image: profile_image,
    },
    {
      name: "jay  bhoi",
      profile_image: profile_image,
    },
    {
      name: "jay  bhoi",
      profile_image: profile_image,
    },
    {
      name: "jay  bhoi",
      profile_image: profile_image,
    },
  ];
  return (
    <div className="relative  z-1000 top-12 m-2 border ">
      <div className="grid grid-cols-4 content-center justify-items-center-safe  gap-4">
        {data.length > 0
          ? data?.map((items, index) => (
              <div key={items._id ?? index}>
                <div className="w-20  m-2  ">
                  <img
                    src={items?.profile_image} //http://localhost:8080$
                    alt=""
                    className="w-full h-full object-cover "
                  />
                  <p className="text-start pl-2">{items.name}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default FriendsList;
