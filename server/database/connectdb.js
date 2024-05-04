import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
async function connectdb() {
    const db = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('Connected to MongoDB ');
    return db;  
  }
  export default connectdb;