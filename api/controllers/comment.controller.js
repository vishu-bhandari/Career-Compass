import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment ")
      );
    }
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req,res,next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    // Find the comment by its ID from the request parameters
    const comment = await Comment.findById(req.params.commentId);
    

    // If the comment doesn't exist, send an error response
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }

    // Find the index of the user ID in the list of likes
    const userIndex = comment.likes.indexOf(req.user.id);
    
    // If the user ID is not found in the list of likes, the user hasn't liked the comment yet
    if (userIndex === -1) {
      // Increment the number of likes
      comment.numberOfLikes += 1;
      // Add the user ID to the list of likes
      comment.likes.push(req.user.id);
    } else {
      // If the user ID is found in the list of likes, the user has already liked the comment
      // Decrement the number of likes
      comment.numberOfLikes -= 1;
      // Remove the user ID from the list of likes
      comment.likes.splice(userIndex, 1);
    }
    
    // Save the updated comment
    await comment.save();
    
    // Respond with the updated comment
    res.status(200).json(comment);
    
  } catch (error) {
    // Handle any errors that occur
    next(error);
  }
};
