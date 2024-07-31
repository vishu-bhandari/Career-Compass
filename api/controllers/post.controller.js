import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
   
  // Check if the user is an admin
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }

  // Check if required fields are provided
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all the required fields"));
  }

  // Generate a slug from the title
  const slug = req.body.title
    .split(" ") // Split title into words by spaces
    .join("-") // Join words with hyphens
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9-]/g, ""); // Remove non-alphanumeric characters except hyphens

  // Create a new post object
  const newPost = new Post({
    ...req.body, // Spread the original post data
    slug, // Add the generated slug
    userId: req.user.id, // Add the user ID from the request user object
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};
