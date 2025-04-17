import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Tbl_rec_signup from "../models/recSignupSchema";
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
  //   console.log("authorized=====>", authorization);

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Extract token from header
      token = authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY || ""
      ) as JwtPayload;

      if (!decoded || !decoded.cmpid) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      //Get user from Token
      req.user = await Tbl_rec_signup.findById(decoded.cmpid).select(
        "-rec_pwd"
      );

      if (!req.user) {
        res.status(400).json({ message: "Unauthorized User " });
        return;
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Unauthorized User " });
    }
  }
  if (!token) {
    res.status(400).json({ message: "Unauthorized user,no Token" });
  }
};

export default authentication;
