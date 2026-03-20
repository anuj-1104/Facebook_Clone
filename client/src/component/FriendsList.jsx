import React, { useEffect, useState } from "react";
import profile_image from "../assets/profile_icon.png";
import { useAppcontext } from "../contaxt/Appcontext";
import axios from "../api/axios";

const FriendsList = () => {
  const { user, token } = useAppcontext();
  const [friendsids, setFriendsids] = useState([]);
  const [friends, setFriends] = useState([]);

  const parsedUser = typeof user === "string" ? JSON.parse(user) : user; //convert string to object
  const _id = parsedUser?.id;

  useEffect(() => {
    const handleFriends = async () => {
      try {
        const response = await axios.get("/api/user/friends", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response);
        if (response.status === 200) {
          const userdata = response.data;
          setFriendsids([...new Set(userdata.friends)]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (_id && token) {
      handleFriends();
    }
  }, [_id, token]);

  // console.log(friends);
  useEffect(() => {
    const handleDemo = async () => {
      try {
        if (friendsids) {
          const res = await axios.post("/api/user/login/user", {
            ids: friendsids,
          });
          console.log(res);
          setFriends(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleDemo();
  }, [friendsids]);

  return (
    <div className="relative z-10 top-12 m-2 border rounded border-black/30">
      <div className="grid grid-cols-3 justify-items-center gap-4">
        {friends.length > 0 ? (
          friends.map((items, index) => (
            <div
              key={items._id ?? index}
              className="bg-black/10 p-1 m-1 rounded"
            >
              <div className=" m-2 rounded-full">
                <img
                  src={items?.profile_image || profile_image}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="w-full m-0 capitalize font-medium">
                  <p className="">{items?.name}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="">
            <p>Not Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsList;
