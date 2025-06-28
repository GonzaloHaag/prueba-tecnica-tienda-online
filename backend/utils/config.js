const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key-change-in-production';
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

if (!MONGODB_URI) {
  console.error('MONGODB_URI no está configurado');
  process.exit(1);
}

export default {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    CLOUDINARY_SECRET
}