import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAppcontext } from "../contaxt/Appcontext";

const UserPost = () => {
  const { token, user, handlerlikes, getImageGridClass } = useAppcontext();
  const [open, setOpen] = useState(null);
  const [active, setActive] = useState(null);
  const [like, setLike] = useState(null);
  const [error, setError] = useState("");
  const [friends, setFriends] = useState([]);
  const [commentmodel, setCommentModel] = useState(null);

  useEffect(() => {
    const handleFriends = async () => {
      try {
        const response = await axios.post(
          "/api/user/allpost",
          {
            user_id: user.id,
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

  const handlelike = async (id) => {
    if (!id) {
      return;
    }

    if (like == id) {
      return;
    }

    if (await handlerlikes(id)) {
      setActive(id);

      setLike(id);
      const timer = setTimeout(() => {
        setLike(null);
      }, 2000);
      await timer;
    } else {
      setActive(null);
    }
  };

  return (
    <div className="relative  z-1000  px-2 sm:px-4 md:px-0 max-w-2xl mx-auto">
      <div className="space-y-4">
        {friends.length > 0 ? (
          friends.map((items) => (
            <div
              key={items._id}
              className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-4 border border-gray-200"
            >
              <div className="flex justify-between items-center bg-white mb-3">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    src={items.profile_image}
                    alt={items.user_name}
                  />
                  <p
                    style={{ fontFamily: "SN Pro" }}
                    className="font-bold text-sm sm:text-base capitalize"
                  >
                    {items.user_name}
                  </p>
                </div>
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpen((prev) => (prev === items._id ? null : items._id))
                    }
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <HiDotsHorizontal className="text-xl sm:text-2xl" />
                  </button>
                  {open === items._id && (
                    <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <button
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded-t-lg"
                        onClick={() => {
                          alert(items.user_name);
                          setOpen(null);
                        }}
                      >
                        Block User
                      </button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg">
                        Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="font-medium text-sm sm:text-base mb-3">
                  {items.description}
                </p>
              </div>

              <div
                onDoubleClick={() => handlelike(items._id)}
                className={`grid ${getImageGridClass(items.image_url.length)} rounded-lg overflow-hidden`}
              >
                {items.image_url.map((image, index) => (
                  <div key={index} className="justify-items-center-safe">
                    <img
                      className="w-full h-auto object-fill "
                      key={index}
                      src={image}
                      alt={image}
                    />
                  </div>
                ))}

                {like == items._id && (
                  <div className="absolute items-center justify-center  pointer-events-none ">
                    <AiFillLike className="relative text-blue-600 top-15 left-30 text-6xl sm:text-7xl md:text-8xl animate-bounce z-10" />
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-3 pb-2 mt-2 border-t border-gray-100">
                <button
                  title="Like"
                  className="flex items-center gap-1 sm:gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => handlelike(items._id)}
                >
                  {active === items._id ? (
                    <AiFillLike className="text-xl sm:text-2xl text-blue-600" />
                  ) : (
                    <AiOutlineLike className="text-xl sm:text-2xl" />
                  )}
                  <span className="text-sm sm:text-base">{items.like}</span>
                </button>

                <div className="relative">
                  <button
                    title="Comment"
                    onClick={() =>
                      setCommentModel((prev) =>
                        prev === items._id ? null : items._id,
                      )
                    }
                    className="flex items-center gap-1 sm:gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FaRegComment className="text-xl sm:text-2xl" />
                    <span className="text-sm sm:text-base">
                      {items.comment.length}
                    </span>
                  </button>

                  {commentmodel === items._id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-80 sm:w-96">
                      <div className="bg-white rounded-lg shadow-xl p-4 border border-gray-200">
                        <div className="max-h-60 overflow-y-auto mb-4">
                          {items.comment && items.comment.length > 0 ? (
                            items.comment.map((c, index) => (
                              <div
                                key={index}
                                className="mb-2 p-2 bg-gray-100 rounded-md"
                              >
                                <p className="text-sm text-left">{c}</p>
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
                            className="border border-gray-300 flex-1 p-2 rounded-full outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                          />
                          <button className="bg-blue-500 text-white px-4 py-1.5 rounded-full hover:bg-blue-600 transition-colors text-sm font-medium">
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  title="Share"
                  className="flex items-center gap-1 sm:gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <RiShareForwardLine className="text-xl sm:text-2xl" />
                  <span className="text-sm sm:text-base">Share</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl sm:text-2xl font-medium text-gray-500 animate-pulse">
              {error || "No posts available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPost;
