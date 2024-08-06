import React, { useEffect, useState } from "react";
import moment from "moment";
import Modal from "./Modal";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

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

  function handleImageClick() {
    if (user.profilePicture) {
      setIsModalOpen(true);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
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
              src={user.profilePicture}
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
            {isEditing ? (
              <>
                <Textarea
                  className="mb-2"
                  rows="3"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                ></Textarea>
                <div className="flex justify-end gap-2 text-xs">
                  <Button
                    type="button"
                    size="sm"
                    gradientDuoTone="purpleToBlue"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    outline
                    size="sm"
                    gradientDuoTone="purpleToBlue"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-500 mb-2">{comment.content}</p>
                <div className="flex items-center gap-2 pt-2 text-sm border-t dark:border-gray-700 max-w-fit ">
                  <button
                    type="button"
                    onClick={() => onLike(comment._id)}
                    className={` text-gray-400 hover:text-blue-500 ${
                      currentUser &&
                      comment.likes.includes(currentUser._id) &&
                      "!text-blue-500"
                    }`}
                  >
                    <FaThumbsUp className=" text-sm " />
                  </button>
                  <p className="text-gray-400 ">
                    {comment.numberOfLikes > 0 &&
                      comment.numberOfLikes +
                        " " +
                        (comment.numberOfLikes === 1 ? "Like" : "likes")}
                  </p>
                  {currentUser &&
                    (currentUser._id === comment.userId ||
                      currentUser.isAdmin) && (
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="text-gray-400 hover:text-blue-500"
                      >
                        Edit
                      </button>
                    )}
                </div>
              </>
            )}
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
