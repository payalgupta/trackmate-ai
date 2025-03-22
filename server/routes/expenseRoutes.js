import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("List of expenses");
});

router.post("/", (req, res) => {
  res.send("Create expense");
});

export default router;
