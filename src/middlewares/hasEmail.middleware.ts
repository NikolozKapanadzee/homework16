import { Request, Response, NextFunction } from "express";

const hasEmail = (req: Request, res: Response, next: NextFunction): void => {
  const email = req.headers.email;
  if (!email) {
    res.status(400).json({ error: "Email header is required" });
    return;
  }
  next();
};
export default hasEmail;
