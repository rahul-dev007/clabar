import express from "express";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/single", upload.single("image"), (req, res) => {
  return res.json({ url: req.file.path });
});

export default router;
