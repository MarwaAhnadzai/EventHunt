// src/controllers/authController.js
// Handles user registration and login

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// ✅ Register new user
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username || email.split("@")[0],
      email,
      password: hashedPassword,
      role: role || "EVENTHUNT_USER",
    });

    // Exclude password from response
    const { password: _, ...safeUser } = user.toJSON();

    res.status(201).json({
      message: "User registered successfully",
      user: safeUser,
    });
  } catch (err) {
    console.error("🔥 Registration error:", err);
    res.status(500).json({ error: "Registration failed: " + err.message });
  }
};

// ✅ Login existing user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("👉 Login attempt:", email);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password || "");
    if (!isValid) {
      console.log("❌ Invalid password for:", email);
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const secret = process.env.JWT_SECRET || "fallback_secret";
    const token = jwt.sign(
      { id: user.id, role: user.role },
      secret,
      { expiresIn: "1h" }
    );

    // Exclude password before sending back
    const { password: _, ...safeUser } = user.toJSON();

    res.json({ token, user: safeUser });
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ error: "Login failed: " + err.message });
  }
};
