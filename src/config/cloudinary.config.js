import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Multer + Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "uploads"; // default folder name
    let resource_type = "image"; // default

    // Agar PDF hai to resource_type 'auto' rakho
    if (file.mimetype === "application/pdf") {
      resource_type = "auto"; // ✅ FIXED HERE
      folder = "pdfs";
    }

    return {
      folder,
      resource_type,
      allowed_formats: ["jpg", "jpeg", "png", "pdf"],
    };
  },
});

export const upload = multer({ storage });
