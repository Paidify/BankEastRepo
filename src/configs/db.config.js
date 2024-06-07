import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};
