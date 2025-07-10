import mongoose from "mongoose";

import { NODE_ENV, MONGO_URI } from "../config/env.js";

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI enviroment variable inside .env.<development/production>.local"
  );
}

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB in ${process.env.NODE_ENV} mode`);
  } catch (error){
    console.log('Error connecting to mongodb', error);
    process.exit(1);
  }
};

export default connectToMongoDB;