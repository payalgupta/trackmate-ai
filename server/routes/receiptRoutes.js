import express from "express";
import upload from "../middleware/upload.js";
import Tesseract from "tesseract.js";
import fs from "fs";
const router = express.Router();

router.post("/scan", upload.single("receipt"), async (req, res) => {
  try {
    const imagePath = req.file.path;

    const result = await Tesseract.recognize(imagePath, "eng");
    const text = result.data.text;

    // Optional: Delete file after processing
    fs.unlinkSync(imagePath);

    // Simple example: extract lines that might contain total/amount
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const parsed = {
      text,
      amount: lines.find(
        (l) => l.toLowerCase().includes("total") || l.match(/\$\d+/)
      ),
      merchant: lines[0], // first line is usually the vendor
      date: lines.find((l) => l.match(/\d{2}\/\d{2}\/\d{4}/)), // e.g. 03/21/2025
    };

    res.json({ parsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OCR failed", error: err.message });
  }
});

export default router;
