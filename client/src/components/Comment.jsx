import React, { useEffect, useState } from "react";
import moment from "moment";
import Modal from "./Modal"; // Import the Modal component

export default function Comment({ comment }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/${comment.userId}`);
        if (!res.ok) {
          throw new Error("User not found");
        }
        const data = await res.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (comment.userId) {
      getUser();
    } else {
      setLoading(false);
      setError("User ID is missing");
    }
  }, [comment]);

  const handleImageClick = () => {
    if (user.profilePicture) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      {loading ? (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="ml-3 animate-pulse w-full">
            <div className="h-4 bg-gray-200 mb-2"></div>
            <div className="h-3 bg-gray-200"></div>
          </div>
        </div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <>
          <div
            className="flex-shrink-0 mr-3 cursor-pointer"
            onClick={handleImageClick}
          >
            <img
              className="w-10 h-10 rounded-full bg-gray-200"
              src={user.profilePicture || "default-profile.png"}
              alt={user.username || "User"}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <span className="font-bold mr-1 text-xs truncate">
                {user.username ? `@${user.username}` : "Anonymous User"}
              </span>
              <span className="text-gray-500 text-xs">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            <p className="text-gray-500 mb-2">{comment.content}</p>
          </div>
        </>
      )}

      {isModalOpen && (
        <Modal
          src={user.profilePicture || "default-profile.png"}
          alt={user.username || "User"}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
