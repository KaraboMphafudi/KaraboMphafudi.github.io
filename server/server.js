import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Message from "./models/Message.js";

const app = express();
app.set("trust proxy", 1);
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json({ limit: "10kb" }));

const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

async function notify({ name, email, message }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transport.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `${message}\n\nFrom: ${name} (${email})`,
  });
}

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message, website } = req.body || {};
  if (website) return res.json({ ok: true }); // honeypot: bots fill this hidden field
  if (!name || !message || !emailOk(email || "")) {
    return res.status(400).json({ error: "Please fill in your name, a valid email and a message." });
  }
  try {
    const saved = await Message.create({ name, email, message });
    notify(saved).catch((e) => console.error("Email failed:", e.message));
    res.status(201).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Something went wrong. Please email me directly." });
  }
});

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`API running on port ${port}`)))
  .catch((e) => { console.error("MongoDB connection failed:", e.message); process.exit(1); });
