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

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex || 0);
    const limit = parseInt(req.query.limit || 9);
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Build query object based on query parameters
    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }), // Corrected the slug filter
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      })
    };

    // Fetch posts based on query
    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // Count total posts with the same filters
    const totalPosts = await Post.countDocuments(query);

    // Calculate date for the start of the last month
    const now = new Date();
    const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfLastMonth = new Date(firstDayOfCurrentMonth - 1);

    // Count posts created in the last month
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: lastDayOfLastMonth }
    });

    // Respond with the results
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts
    });

  } catch (error) {
    next(error);
  }
};
