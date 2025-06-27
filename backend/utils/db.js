import mongoose from "mongoose"
import config from "./config.js"
export const connectDb = async() => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Mongo conectado!')
    } catch (error) {
        console.error(error.message);
    }
}