import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Tbl_js_signup from "../models/signupSchema";
import "dotenv/config";

interface AuthRequest extends Request {
  user?: any;
}

const authentication = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Extract token from header
      token = authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY || ""
      ) as JwtPayload;
      console.log(decoded);

      if (!decoded || !decoded.id) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      // Get user from Token and attach to request
      req.user = await Tbl_js_signup.findById(decoded.id).select("-js_pwd");

      if (!req.user) {
        res.status(400).json({ message: "Unauthorized User " });
        return;
      }

      next();
    } catch (error) {
      console.error("Auth Error:");
      res.status(400).send({ message: "Unauthorized User " });
    }
  }
  if (!token) {
    res.status(400).json({ message: "Unauthorized user,no Token" });
  }
};

export default authentication;
