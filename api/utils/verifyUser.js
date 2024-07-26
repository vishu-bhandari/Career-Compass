import jwt from "jsonwebtoken";
import { errorHandler } from "./error";

export const verifyToken = (req, res, next) => {
  const token = req.cookie.access_token;
};
