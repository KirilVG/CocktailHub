import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const CONNECTION_STRING = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";

export async function connectDB() {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}