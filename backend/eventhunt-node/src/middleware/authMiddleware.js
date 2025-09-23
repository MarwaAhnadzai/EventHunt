// src/middleware/authMiddleware.js
// Middleware to verify JWT tokens in "Authorization: Bearer <token>"

import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  // Extract token from "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });

    req.user = decoded; // Store decoded user info { id, role }
    next();
  });
};
