import React, { useEffect, useState } from "react";
import profile_img from "../assets/profile_icon.png";

const Friends_Page = () => {
  const [search, setSearch] = useState("");
  const [friendsdata, setFriendsData] = useState([]);

  const handlechange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const result = dummyfiends.filter((itmes) =>
      itmes.name.toLowerCase().includes(search),
    );

    setFriendsData(result);
  };

  useEffect(() => {
    if (search.length <= 0) {
      setFriendsData(dummyfiends);
    }
  }, [search]);

  const dummyfiends = [
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
    {
      profile_img: profile_img,
      name: "jay patel",
    },
  ];

  return (
    <>
      <div className="relative top-20 border ">
        <div className="m-3 ">
          <input
            type="text"
            name="search"
            value={search}
            onChange={handlechange}
            id="searchbar"
            placeholder="search."
            className="p-1 outline-0 focus:border-2 rounded-2xl duration-150  border-b-2 w-full "
          />
        </div>
        {dummyfiends.length > 0 ? (
          friendsdata.map((items, key) => (
            <div key={key} className="bg-gray-300 m-2">
              <div className="p-5  h-auto w-full flex gap-5">
                <img
                  src={items.profile_img}
                  alt={items.profile_img}
                  className="w-10 h-10 rounded-full"
                />

                <p>{items.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 p-2">
                <button className="text-white bg-blue-700 p-2 rounded-3xl ">
                  Add friend
                </button>
                <button className="text-white bg-gray-400 p-2 rounded-3xl ">
                  Remove
                </button>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div>
            <p>Not Found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Friends_Page;
