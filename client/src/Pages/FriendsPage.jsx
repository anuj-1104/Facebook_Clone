import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAppcontext } from "../contaxt/Appcontext";

const Friends_Page = () => {
  const [search, setSearch] = useState("");
  const [friendsdata, setFriendsData] = useState([]);
  const [data, setData] = useState([]);
  const [request, setRequest] = useState("");
  const [friendreq, setFriendReq] = useState([]);

  const { token, friendsrequest, user } = useAppcontext();

  useEffect(() => {
    const findFriendsRequest = async () => {
      try {
        const response = await axios.get("/api/request/friend/notification");
        if (response.status === 200) {
          setFriendReq(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    findFriendsRequest();
  }, []);

  useEffect(() => {
    const result = friendsrequest.filter((pre) => pre._id !== user._id);

    if (result) {
      setFriendReq(result);
    }
  }, []);

  const handlechange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const result = data.filter((itmes) =>
      itmes.name.toLowerCase().includes(search),
    );

    setFriendsData(result);
  };

  useEffect(() => {
    const handlerfriends = async () => {
      try {
        const response = await axios.get("/api/user/allusers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setData(response.data.data);
          setFriendsData(response.data.data);
        }
      } catch (error) {
        console.log(error || response.error);
      }
    };

    handlerfriends();
  }, []);

  const handllerfriends = async (request) => {
    try {
      const response = await axios.post(
        "/api/request/friend/request",
        {
          request: request,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        setRequest(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search.length <= 0) {
      setFriendsData(data);
    }
  }, [search]);

  return (
    <>
      <div className="relative max-w-2xl mx-auto top-20  ">
        <div className="m-3 ">
          <input
            type="text"
            name="search"
            value={search}
            spellCheck="false"
            autoFocus
            onChange={handlechange}
            id="searchbar"
            placeholder="search."
            className="p-2 outline-0 mt-2 text-2xl capitalize duration-150  border-b-2 w-full "
          />
        </div>

        <div
          className="font-bold text-2xl m-2 "
          style={{ fontFamily: " SN Pro" }}
        >
          <h3>New Request</h3>
        </div>

        {friendreq.length > 0 &&
          friendreq.map((item, index) => (
            <div key={index} className="m-2   ">
              <div className="p-3  h-auto w-full flex gap-5">
                <img
                  src={item.profile_image}
                  alt={item.profile_image}
                  className="w-10 h-10 rounded-full"
                />

                <p>{item.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 p-2">
                <button
                  onClick={() => handllerfriends(item._id)}
                  className="text-white bg-blue-600 p-2 hover:bg-blue-700  font-medium duration-300 "
                >
                  Confirm
                </button>
                <button className="text-white bg-gray-400 hover:bg-gray-500 duration-300 p-2 font-medium ">
                  Remove
                </button>
              </div>
            </div>
          ))}

        <br />

        {data.length > 0 ? (
          friendsdata.map((user, key) => (
            <div key={key} className="backdrop-blur-md  m-2  border rounded">
              <div className="p-3  h-auto w-full flex gap-5">
                <img
                  src={user.profile_image}
                  alt={user.profile_image}
                  className="w-10 h-10 rounded-full"
                />

                <p className="capitalize font-medium">{user.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 p-2">
                <button
                  onClick={() => handllerfriends(user._id)}
                  className="text-white bg-blue-600 p-2 hover:bg-blue-700  font-medium duration-200 "
                >
                  Add friend
                </button>
                <button className="text-white bg-gray-400 hover:bg-gray-500 duration-200 p-2 font-medium ">
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="text-center font-medium min-h-screen"> Not Found </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Friends_Page;
