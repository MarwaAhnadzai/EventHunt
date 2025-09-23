// src/routes/events.js
import express from "express";
import { createEvent, getEvents, getEventById } from "../controllers/eventController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, createEvent);   // Protected
router.get("/", getEvents);                         // Public
router.get("/:id", getEventById);                   // Public

export default router;
