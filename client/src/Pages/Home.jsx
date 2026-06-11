import React, { useEffect, useRef, useState, useCallback } from "react";
import ProfileBar from "../component/ProfileBar";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";
import StorySection from "../component/StorySection";
import axios from "../api/axios";
import { useAppcontext } from "../contaxt/Appcontext";

const Home = () => {
  const [open, setOpen] = useState(null);
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const [friendspost, setFriendsPost] = useState([]);
  const [error, setError] = useState(false);
  const [like, setLike] = useState(null);
  const [likedusers, setLikedUsers] = useState([]);
  const [commentmodel, setCommentModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [filterdata, setFilterData] = useState([]);

  const { handlerlikes, getImageGridClass, user } = useAppcontext();
  const commentScrollRef = useRef(null);
  const timeoutRef = useRef(null);

  // Fetch posts from API
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/all/post");
      if (response.status === 200) {
        setFriendsPost(response?.data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchPosts();

    // Cleanup function to clear timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fetchPosts]);

  // Reset error when search changes
  useEffect(() => {
    if (search.trim().length > 0) {
      setError(false);
    }
  }, [search]);

  // Handle comment submission
  const handleComment = async (comment, id) => {
    if (!comment.trim()) {
      setError(true);
      return;
    }

    try {
      setSubmittingComment(true);
      // Fixed API endpoint to include the actual post ID
      const response = await axios.patch(`/api/user/comment/${id}`, {
        comment,
      });

      if (response.status === 200) {
        setSearch("");
        setError(false);

        // Update the specific post in state instead of refetching all posts
        setFriendsPost((prevPosts) =>
          prevPosts.map((post) =>
            post._id === id
              ? { ...post, comment: [...(post.comment || []), comment] }
              : post,
          ),
        );

        // Scroll to bottom of comments after a short delay
        setTimeout(() => {
          if (commentScrollRef.current) {
            commentScrollRef.current.scrollTop =
              commentScrollRef.current.scrollHeight;
          }
        }, 100);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmittingComment(false);
    }
  };

  // Handle like/unlike
  const handlelike = async (id) => {
    try {
      const res = await handlerlikes(id);

      setFriendsPost((prev) =>
        prev.map((post) => {
          if (post._id === id) {
            const alreadyLiked = post.likeduser.includes(user._id);

            return {
              ...post,
              like: alreadyLiked ? post.like - 1 : post.like + 1,
              likeduser: alreadyLiked
                ? post.likeduser.filter((u) => u !== user._id)
                : [...post.likeduser, user._id],
            };
          }
          return post;
        }),
      );

      setLike(id);
      // Use ref to store timeout reference to prevent memory leaks
      timeoutRef.current = setTimeout(() => setLike(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="select-none relative mb-8">
      <ProfileBar />

      <StorySection />

      <div className="max-w-2xl mt-20 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : friendspost?.length > 0 ? (
          friendspost.map((items) => (
            <div
              key={items._id}
              className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    src={items?.profile_image}
                    alt={items?.user_name}
                  />
                  <p className="font-bold capitalize">{items?.user_name}</p>
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

              {/* Description */}
              <div className="px-4 pb-2">
                <p className="font-medium text-sm sm:text-base">
                  {items?.description}
                </p>
              </div>

              {/* Images */}
              {items?.image_url && items.image_url.length > 0 && (
                <div
                  onDoubleClick={() => handlelike(items._id)}
                  className={`relative grid ${getImageGridClass(items.image_url.length)} gap-1 p-2 justify-items-center-safe`}
                >
                  {items.image_url.map((image, index) => (
                    <img
                      key={index}
                      className="w-full h-full object-cover rounded"
                      src={image}
                      alt={`Post image ${index + 1}`}
                    />
                  ))}

                  {like === items._id && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <AiFillLike className="text-blue-600 text-6xl sm:text-7xl md:text-8xl animate-bounce z-10" />
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center p-4 border-t border-gray-100">
                {/* Like */}
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => handlelike(items._id)}
                >
                  {/* Fixed: Changed user.id to user._id for consistency */}
                  {items.likeduser.includes(user._id) ? (
                    <AiFillLike className="text-xl sm:text-2xl text-blue-600" />
                  ) : (
                    <AiOutlineLike className="text-xl sm:text-2xl" />
                  )}
                  <span className="text-sm sm:text-base">{items?.like}</span>
                </button>

                {/* Comment */}
                <div className="relative">
                  <button
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() =>
                      setCommentModel((prev) =>
                        prev === items._id ? null : items._id,
                      )
                    }
                  >
                    <FaRegComment className="text-xl sm:text-2xl" />
                    <span className="text-sm sm:text-base">
                      {items?.comment?.length || 0}
                    </span>
                  </button>

                  {commentmodel === items._id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-80 sm:w-96">
                      <div className="bg-white rounded-lg shadow-xl p-4 border border-gray-200">
                        <div
                          ref={commentScrollRef}
                          className="max-h-60 overflow-y-auto mb-4"
                        >
                          {items?.comment?.length > 0 ? (
                            items.comment.map((c, index) => (
                              <div
                                key={index}
                                className="mb-2 p-2 bg-gray-100 rounded-md"
                              >
                                <p className="text-sm">{c}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm text-center py-2">
                              No comments yet. Be the first to comment!
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={
                              error ? "Enter comment" : "Add a comment..."
                            }
                            className={`border-2 flex-1 ${
                              error ? "border-red-500" : "border-gray-300"
                            } p-2 rounded-full outline-none focus:ring-2 focus:ring-blue-400 text-sm`}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleComment(search, items._id);
                              }
                            }}
                          />

                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
                            onClick={() => handleComment(search, items._id)}
                            disabled={submittingComment}
                          >
                            <IoIosSend className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Share */}
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <RiShareForwardLine className="text-xl sm:text-2xl" />
                  <span className="text-sm sm:text-base">Share</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-64 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p>No posts available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
