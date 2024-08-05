import { Alert, Button, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const [commentError, setCommentError] = useState(null);

  const [comments, setComments] = useState([]);

  console.log(comments);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();

          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data,...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  return (
    <div className=" max-w-2xl  w-full mx-auto">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm ">
          <p>Signed in as </p>
          <img
            className="h-5 w-5 object-cover rounded-full "
            src={currentUser.profilePicture}
            alt={currentUser.username}
          />
          <Link to={"/dashboard?tab=profile"}>@{currentUser.username}</Link>
        </div>
      ) : (
        <div className=" text-sm text-teal-500 my-5 flex gap-1">
          You must be Signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className=" border border-teal-500 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment"
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></Textarea>
          <div className="flex justify-between items-center mt-5 ">
            <p className="text-gray-500 text-sm ">
              {200 - comment.length} characters remaining
            </p>
            <Button type="submit" outline gradientDuoTone="purpleToBlue">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5 ">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <>
          <p className=" text-sm my-5 text-gray-500 ">No comments yet!!</p>
        </>
      ) : (
        <>
          <div className=" text-sm my-5 flex items-center gap-1">
            <p className=" text-gray-500">Comments</p>
            <div className=" border border-gray-400 py-1 px-2 rounded-lg">
              <p>{comments.length} </p>
            </div>
          </div>
          {comments.map((comment) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
        </>
      )}
    </div>
  );
}
