import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const role = req.headers["role"] as string;
  if (role !== "admin") {
    res.status(401).json({ message: "permission denied" });
    return;
  }
  next();
};
export default isAdmin;
