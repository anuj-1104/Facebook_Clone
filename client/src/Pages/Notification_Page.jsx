import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const Notification_Page = () => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const handllerNotifi = async () => {
      try {
        const response = await axios.get("/api/request/friend/notification");

        if (response.status === 200) {
          console.log(response);
          setNotification(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handllerNotifi();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen ">
      {notification &&
        notification.map((items, key) => (
          <div key={key} className=" relative top-20 bg-gray-400 mb-1">
            <div className="p-4 pb-0 flex gap-3 ">
              <img
                src={`http://localhost:8080/${items.profile_image}`}
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
        ))}
    </div>
  );
};

export default Notification_Page;
