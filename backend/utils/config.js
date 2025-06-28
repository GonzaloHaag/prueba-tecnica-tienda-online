const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

export default {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    CLOUDINARY_SECRET
}