import React from "react";
import { useAppcontext } from "../contaxt/Appcontext";
import { MdOutlineOndemandVideo } from "react-icons/md";
import axios from "../api/axios";
import { useState } from "react";

const Tranding_Page = () => {
  const { token, videosdata, user } = useAppcontext();
  const User = user;
  const [file, setFile] = useState(null);
  const [formdata, setFormData] = useState({
    description: "",
  });

  const uplodVideo = async () => {
    try {
      if (!file) {
        console.log("file not found");
        return;
      }
      const form = new FormData();
      form.append("description", formdata.description);
      form.append("video", file);

      const res = await axios.post("/api/post/upload/video", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setVideos(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative top-22  max-w-2xl mx-auto">
      <div className="  bg-white  border-b border-gray-200 shadow-sm rounded">
        <div className="flex items-center gap-5">
          <div className="">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              name="video"
              style={{ display: "none" }}
              id="video"
              accept="video/*" //accepts only videos
            />
          </div>
          <div className="w-full p-1">
            <input
              type="text"
              name="description"
              className=" rounded-2xl w-full outline-0 p-2 md:w-full sm:w-full bg-black/6"
              id="description"
              placeholder={`What's on your mind, ${User?.name || ""}?`}
              value={formdata.description}
              onChange={(e) => setFormData({ description: e.target.value })}
            />
          </div>
          <div className="">
            <button
              onClick={uplodVideo}
              style={{ textAlign: "-webkit-center " }}
              type="button"
              title="Add Videos"
              className="hover:bg-black/8 rounded-full w-12 h-12 duration-200"
            >
              <MdOutlineOndemandVideo className="text-4xl " />
            </button>
          </div>
        </div>
      </div>
      {videosdata.length > 0 &&
        videosdata.map((items, key) => (
          <div key={key}>
            <div className="p-3 flex gap-4 font-bold ">
              <img
                src={items?.profile_image}
                alt="profile_image"
                className="w-10 h-10 rounded-full"
              />
              <p className="capitalize" style={{ fontfamily: "SN pro" }}>
                {items?.user_name}
              </p>
            </div>
            <p className="pl-4 pr-3">{items?.description}</p>
            <div className=" ">
              <video
                src={items?.video_url}
                className=" w-full"
                controls
              ></video>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tranding_Page;
