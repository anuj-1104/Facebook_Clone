import React from "react";
import { useAppcontext } from "../contaxt/Appcontext";

const Notification_Page = () => {
  const { profile_image } = useAppcontext();
  return (
    <div className=" relative top-20">
      <div className="p-4 flex gap-4 ">
        <img
          src={profile_image}
          alt="image_profile"
          className="w-8 h-8 border rounded-full"
        />
        <p className="text-2xl">name</p>
      </div>
      <div className="p-4 pt-0">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
      </div>
    </div>
  );
};

export default Notification_Page;
