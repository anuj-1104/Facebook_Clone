import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAppcontext } from "../contaxt/Appcontext";

const UserPost = () => {
  const { token, user, handlerlikes } = useAppcontext();
  const [open, setOpen] = useState(null);
  const [active, setActive] = useState(null);
  const [error, setError] = useState("");
  const [friends, setFriends] = useState([]);
  const [commentmodel, setCommentModel] = useState(null);
  const user_data = JSON.parse(user);

  useEffect(() => {
    const handleFriends = async () => {
      try {
        const response = await axios.post(
          "/api/user/allpost",
          {
            user_id: user_data.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status !== 200) {
          setError(response.data.data);
        }
        setFriends(response.data.data);
      } catch (error) {
        setError(error.response.data.message ?? "Add Post ");
      }
    };

    handleFriends();
  }, [active]);

  const handlelike = (id) => {
    if (!id) {
      return;
    }
    if (handlerlikes(id)) {
      setActive(id);
    } else {
      setActive(null);
    }
  };

  //handle this page 24-2
  return (
    <div className=" relative z-50 top-12 ">
      <div className="">
        {friends.length > 0 ? (
          friends.map((items) => (
            <div key={items._id} className=" bg-white w-auto p-2 over  mb-3">
              <div className=" flex flex-col-2 justify-between   bg-white  ">
                <div className="flex gap-5 text-center">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={`http://localhost:8080/${items.profile_image}`}
                    alt={items.user_name}
                  />
                  <p
                    style={{ fontFamily: "SN Pro" }}
                    className="font-bold align-middle relative top-2  text-center"
                  >
                    {items.user_name}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setOpen((prev) => (prev === items._id ? null : items._id))
                  }
                >
                  <HiDotsHorizontal className=" text-2xl " />
                </button>
                {open === items._id && (
                  <div className="absolute z-50  rounded-2xl p-2  bg-white h-auto outline-1 right-0 w-36  mt-6 m-2 ">
                    <p
                      className="text-red-400  font-normal text-start"
                      onClick={() => [alert(items.user_name), setOpen(null)]} //only dummy purpose
                    >
                      Block User
                    </p>
                    <p className="font-normal">report</p>
                  </div>
                )}
              </div>
              {items.description}
              <div className="grid relative grid-cols-2 gap-1  outline-0 rounded  h-auto ">
                {items.image_url.map((image, index) => (
                  <img
                    className="rounded"
                    key={index}
                    src={`http://localhost:8080/${image}`}
                    alt={image}
                  />
                ))}
              </div>

              <br />
              <div
                style={{ textAlign: "-webkit-center" }}
                className="grid grid-cols-3 pt-3 pb-3  justify-items-center-safe   bg-white"
              >
                <button className="flex" onClick={() => handlelike(items._id)}>
                  {/* Items.likedbyuser manage */}
                  {active === items._id ? (
                    <AiFillLike className="text-2xl text-blue-600" />
                  ) : (
                    <AiOutlineLike className="text-2xl " />
                  )}
                  {items.like}
                </button>

                <div className="relative">
                  <button
                    onClick={() =>
                      setCommentModel((prev) =>
                        prev === items._id ? null : items._id,
                      )
                    }
                    className="justify-items-center-safe flex gap-1"
                  >
                    <FaRegComment className="text-2xl" />
                    <p>{items.comment.length}</p>
                  </button>

                  {commentmodel === items._id ? (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-100">
                      <div className="bg-white rounded-lg shadow-xl p-4 border border-gray-200">
                        <div className="max-h-60 overflow-y-auto mb-4">
                          {items.comment && items.comment.length > 0 ? (
                            items.comment.map((c, index) => (
                              <div
                                key={index}
                                className="mb-2 p-2  bg-gray-200 w-50 rounded-md"
                              >
                                <p className="text-sm w-full text-start">{c}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">
                              No comments yet.
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="comment"
                            autoFocus
                            id="comment"
                            placeholder="Add a comment..."
                            className="border border-gray-300 flex-1 p-2 rounded-full outline-0 focus:ring-2 focus:ring-blue-400 text-sm"
                          />
                          <button className="bg-blue-500 text-white px-4 py-1.5 rounded-full hover:bg-blue-600 transition-colors text-sm font-medium">
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <button className="flex justify-items-center-safe">
                  <RiShareForwardLine className="text-2xl" />
                  <p>share</p>
                </button>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div className="relative justify-items-center-safe m-4">
            <p className="text-2xl font-medium animate-pulse">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPost;
