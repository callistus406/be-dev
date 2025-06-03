import mongoose from "mongoose";

export const mongoConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mack:m6aDKKEFNNVvi5uR@cluster0.kb8caz5.mongodb.net/test-backend"
    );
      console.log("database connected")
  } catch (error) {
      console.log(error)
  }
};
