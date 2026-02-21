import React from "react";
import videos from "../assets/video.mp4";
import { useAppcontext } from "../contaxt/Appcontext";

const Tranding_Page = () => {
  const { profile_image } = useAppcontext();
  const dummydata = [
    {
      profile_data: profile_image,
      video: videos,
      name: "video1",
    },
    { profile_data: profile_image, video: videos, name: "video1" },
    { profile_data: profile_image, video: videos, name: "video1" },
    { profile_data: profile_image, video: videos, name: "video1" },
  ];

  return (
    <div className="relative top-22 bg-gray-300">
      {dummydata.length > 0 &&
        dummydata.map((items, key) => (
          <div key={key}>
            <div className="p-3 flex gap-4 font-bold ">
              <img
                src={items.profile_data}
                alt="profile_image"
                className="w-10 h-10 rounded-full"
              />
              <p>Anuj Dalvadi</p>
            </div>
            <p className="pl-4 pr-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              id.
            </p>
            <div className="">
              <video src={items.video} className=" w-full" controls></video>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tranding_Page;
