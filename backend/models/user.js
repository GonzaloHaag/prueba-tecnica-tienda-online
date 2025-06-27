import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
        minLength: 6
    },
    role: {
        type:String,
        enum:['admin','cliente'],
        required:true,
        default:'cliente'
    }
});
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      // Nunca devuelvo el pass del user
      delete returnedObject.password
    }
});

export const User = mongoose.model('User',userSchema);