import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    stock: {
        type:Number,
        required:true,
        min: 0
    },
    category: {
        type:String,
        required:true
    },
});

export const Product = mongoose.model('Product',productSchema);