// backend/middleware/multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";  // এক্সটেনশন দিতে হবে

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "clabar_uploads",         // cloudinary ফোল্ডার
    resource_type: "image",
    public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
  }),
});

const upload = multer({ storage });

export default upload;
