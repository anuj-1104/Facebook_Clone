import React, { useEffect, useState } from "react";
import profile_image from "../assets/profile_icon.png";
import { useAppcontext } from "../contaxt/Appcontext";
import axios from "../api/axios";

const FriendsList = () => {
  const { user, token } = useAppcontext();
  const [friendsids, setFriendsids] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parsedUser = typeof user === "string" ? JSON.parse(user) : user;
  const _id = parsedUser?.id;

  useEffect(() => {
    const handleFriends = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/user/friends", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const userdata = response.data;
          setFriendsids([...new Set(userdata.friends)]);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching friends IDs:", error);
        setError("Failed to load friends");
      } finally {
        setLoading(false);
      }
    };

    if (_id && token) {
      handleFriends();
    }
  }, [_id, token]);

  useEffect(() => {
    const handleFriendsDetails = async () => {
      try {
        if (friendsids && friendsids.length > 0) {
          setLoading(true);
          const res = await axios.post("/api/user/login/user", {
            ids: friendsids,
          });
          setFriends(res.data.data);
          setError(null);
        } else {
          setFriends([]);
        }
      } catch (error) {
        console.error("Error fetching friends details:", error);
        setError("Failed to load friends details");
      } finally {
        setLoading(false);
      }
    };

    handleFriendsDetails();
  }, [friendsids]);

  return (
    <div className="relative max-w-2xl mx-auto z-1000  p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Friends</h2>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-red-500">{error}</p>
        </div>
      ) : friends.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {friends.map((items) => (
            <div
              key={items._id}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-200 mb-2">
                <img
                  src={items?.profile_image || profile_image}
                  alt={items?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center w-full">
                <p className="text-sm font-medium text-gray-800 truncate capitalize">
                  {items?.name || "Unknown"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-32 text-gray-500 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-2 text-gray-400 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <p>No friends found</p>
        </div>
      )}
    </div>
  );
};

export default FriendsList;
