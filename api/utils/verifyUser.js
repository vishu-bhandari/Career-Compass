import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  // Ensure cookies are being parsed
  const token = req.cookies.access_token;
  
  // Check if token is present
  if (!token) {
    return next(errorHandler(401, 'Unauthorized - No token provided'));
  }

  // Ensure JWT secret is set
  if (!process.env.JWT_SECRET) {
    return next(errorHandler(500, 'Internal Server Error - Missing JWT secret'));
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Log detailed error for debugging (optional, remove in production)
      console.error('JWT verification error:', err);

      return next(errorHandler(401, 'Unauthorized - Invalid token'));
    }
    
    // Attach user information to request object
    req.user = user;
    
    // Proceed to the next middleware or route handler
    next();
  });
};
