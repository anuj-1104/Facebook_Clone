import React from "react";
import { MdHistoryToggleOff } from "react-icons/md";
import { useAppcontext } from "../contaxt/Appcontext";

const StorySection = () => {
  const { videosdata } = useAppcontext();
  return (
    <div className="relative top-20 max-w-2xl mx-auto ">
      <div className="p-2  flex gap-3 overflow-x-auto  ">
        <div className="relative min-w-20 rounded h-30 border-2 shrink-0">
          <div className="h-full bg-blue-600">
            <img src="" alt="Profiel" className="w-full h-full object-cover" />
            <MdHistoryToggleOff className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl" />
          </div>
        </div>
        {videosdata.length > 0 &&
          videosdata.map((items, key) => (
            <div
              key={key}
              className="relative min-w-20 h-10 rounded shrink-0  "
            >
              <div className=" h-full cursor-grab">
                <div className=" ">
                  <video
                    src={items?.video_url}
                    className="w-50 rounded"
                    autoPlay
                  ></video>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StorySection;
