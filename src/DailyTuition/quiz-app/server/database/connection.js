import mongoose from "mongoose";

export default async function connectDb() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to Mongo database");
}