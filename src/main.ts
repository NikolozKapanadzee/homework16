import express, { Request, Response } from "express";
import connectDB from "./config/connectToDb";

const app = express();
const port = 3000;

const startServer = async () => {
  await connectDB();
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello From Georgia");
  });

  app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
  });
};

startServer();
