// src/server.js
// Main entry point for backend

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import ticketRoutes from "./routes/ticket.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);


// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Sync DB and start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced");
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
