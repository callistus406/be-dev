import { Response, Request, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader === "my-key") {
    next();
  } else {
     res.status(401).json("Unauthorized access");
  }
};
