import express, { Request, Response } from "express";
import connectDB from "./config/connectToDb";
import productsRouter from "./routes/products.route";

const app = express();
const port = 3000;
app.use(express.json());

app.use("/", productsRouter);

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
  });
};

startServer();
