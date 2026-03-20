import React, { useEffect, useRef, useState } from "react";
import ProfileBar from "../component/ProfileBar";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";
import axios from "../api/axios";
import { useAppcontext } from "../contaxt/Appcontext";

const Home = () => {
  const [open, setOpen] = useState(null);
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const [friendspost, setFriendsPost] = useState([]);
  const [error, setError] = useState(false);
  const [commentmodel, setCommentModel] = useState(null);

  const { handlerlikes } = useAppcontext();
  const commentScrollRef = useRef(null);

  useEffect(() => {
    if (search.trim().length === 0) {
      setError(false);
    }
  }, [search]);

  useEffect(() => {
    const handlePost = async () => {
      try {
        const response = await axios.get("/api/user/all/post");

        if (response.status === 200) {
          setFriendsPost(response?.data?.data || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handlePost();
  }, [active]); // only refetch when like changes

  const handleComment = async (comment, id) => {
    if (!comment.trim()) {
      setError(true);
      return;
    }

    try {
      const response = await axios.patch("/api/user/comment/id", {
        comment,
        id,
      });

      if (response.status === 200) {
        setSearch("");
        setError(false);

        // Refresh posts after comment
        const updated = await axios.get("/api/user/all/post");
        setFriendsPost(updated?.data?.data ?? []);

        setTimeout(() => {
          if (commentScrollRef.current) {
            commentScrollRef.current.scrollTop =
              commentScrollRef.current.scrollHeight;
          }
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlelike = (id) => {
    if (!id) return;

    const liked = handlerlikes(id);
    setActive(liked ? id : null);
  };

  return (
    <div className="select-none relative top-34">
      <ProfileBar />

      <div className="bg-white">
        {friendspost?.length > 0 &&
          friendspost.map((items) => (
            <div key={items._id} className="bg-white w-auto p-2">
              {/* Header */}
              <div className="flex justify-between bg-white">
                <div className="flex gap-5">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={items?.profile_image}
                    alt={items?.user_name}
                  />
                  <p className="font-bold relative top-2 capitalize">
                    {items?.user_name}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setOpen((prev) => (prev === items._id ? null : items._id))
                  }
                >
                  <HiDotsHorizontal className="text-2xl" />
                </button>

                {open === items._id && (
                  <div className="absolute z-50 rounded-2xl p-2 bg-white outline-1 right-0 w-36 mt-6 m-2 shadow-md">
                    <p
                      className="text-red-400"
                      onClick={() => {
                        alert(items.user_name);
                        setOpen(null);
                      }}
                    >
                      Block User
                    </p>
                    <p>Report</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="font-medium p-2 pl-0 ">{items?.description}</p>

              {/* Images */}
              <div className="grid grid-cols-2 gap-1 rounded">
                {items?.image_url?.map((image, index) => (
                  <img key={index} className="rounded" src={image} alt="post" />
                ))}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 pt-3 pb-3 justify-items-center bg-white">
                {/* Like */}
                <button
                  className="flex items-center gap-1"
                  onClick={() => handlelike(items._id)}
                >
                  {active === items._id ? (
                    <AiFillLike className="text-2xl text-blue-600" />
                  ) : (
                    <AiOutlineLike className="text-2xl" />
                  )}
                  {items?.like}
                </button>

                {/* Comment */}
                <div className="relative">
                  <button
                    className="flex gap-1"
                    onClick={() =>
                      setCommentModel((prev) =>
                        prev === items._id ? null : items._id,
                      )
                    }
                  >
                    <FaRegComment className="text-2xl" />
                    <p>{items?.comment?.length || 0}</p>
                  </button>

                  {commentmodel === items._id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-96">
                      <div className="bg-white rounded-lg shadow-xl p-4 border">
                        <div
                          ref={commentScrollRef}
                          className="max-h-60 overflow-y-scroll mb-4"
                        >
                          {items?.comment?.map((c, index) => (
                            <div
                              key={index}
                              className="mb-2 p-2 bg-gray-200 rounded-md"
                            >
                              <p className="text-sm">{c}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={
                              error ? "Enter comment" : "Add comment"
                            }
                            className={`border-2 flex-1 ${
                              error ? "border-red-600" : "border-gray-300"
                            } p-2 rounded-full outline-none`}
                          />

                          <button
                            className="bg-blue-500 text-white px-4 rounded-full"
                            onClick={() => handleComment(search, items._id)}
                          >
                            <IoIosSend className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Share */}
                <button className="flex items-center gap-1">
                  <RiShareForwardLine className="text-2xl" />
                  Share
                </button>
              </div>

              <hr />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
