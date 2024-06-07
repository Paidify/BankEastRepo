import mongoose from "mongoose";

export const connect = () => {
  mongoose.connect(process.env.MONGODB_URI);

  mongoose.connection.on("connected", function () {
    console.log("Connected to Bank Database!");
  });

  mongoose.connection.on("error", function (err) {
    console.log("Cannot connect to Bank Database", err);
  });

  mongoose.connection.on("disconnected", function () {
    console.log("Disconnected from Bank Database");
  });
};
