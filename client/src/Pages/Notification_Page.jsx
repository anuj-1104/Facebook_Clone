import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAppcontext } from "../contaxt/Appcontext";

const Notification_Page = () => {
  const [notification, setNotification] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAppcontext();

  const handllerNotifi = async () => {
    try {
      const response = await axios.get("/api/request/friend/notification", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setNotification(response.data);
      }
    } catch (error) {
      console.error(error.response.data.message);
      setError(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (token) {
      handllerNotifi();
    }
  }, [token]);

  return (
    <div className="bg-black/10 min-h-screen max-w-2xl mx-auto relative top-20">
      {notification.length > 0 ? (
        notification.map((items, key) => (
          <div key={key} className="  bg-gray-400 mb-1">
            <div className="p-4 pb-0 flex gap-3 ">
              <img
                src={items.profile_image}
                alt="image_profile"
                className=" border  w-8 h-8 rounded-full"
              />
              <p className="font-medium">{items.name}</p>
            </div>
            <div className="justify-items-center-safe">
              <p>{`Lorem, ipsum dolor sit amet consectetur.`}</p>
            </div>
            <hr className="" />
          </div>
        ))
      ) : (
        <div className="bg-white justify-items-center-safe min-h-screen p-10">
          <div className="bg-black/20 rounded w-full">
            <p className="text-black/60 font-medium p-2 text-center">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification_Page;
