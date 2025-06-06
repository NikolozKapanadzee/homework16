import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("connected to DB");
  } catch (e) {
    console.log("could not connect to DB", e);
  }
};

export default connectDB;
