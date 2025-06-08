import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.mongoURL);
        console.log("MongoDB connected successfully");
    }catch(error){
        console.error("mongoDB connection failed:", error.message);
    }
}

export default connectDB;