// server/app.js
import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import receiptRoutes from "./routes/receiptRoutes.js";

const app = express();

// Needed for static file paths in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server
    credentials: true, // if using cookies/session
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/receipts", receiptRoutes);

export default app;
