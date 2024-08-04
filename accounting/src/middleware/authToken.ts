import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

interface JwtPayload {
  username: string;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as JwtPayload;
    next();
  });
};
