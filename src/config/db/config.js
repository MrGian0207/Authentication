import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

function ConnectMongoDB() { 
    mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true
    })
        .then (() => {
            console.log("Connected to MongoDB");
        })
        .catch ((err) => {
            console.log(err);
        });
}

export default ConnectMongoDB;