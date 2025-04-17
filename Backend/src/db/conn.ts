import mongoose from "mongoose";
import "dotenv/config";

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    console.log("Connection Successful!!");
  } catch (error) {
    console.error("Connection Failed!", error);
  }
};

connectDB();
