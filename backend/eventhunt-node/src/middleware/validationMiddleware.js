// src/middleware/validationMiddleware.js
export const validateEvent = (req, res, next) => {
  const { title, date } = req.body;
  
  if (!title || title.trim().length < 5) {
    return res.status(400).json({ error: "Title must be at least 5 characters" });
  }
  
  if (!date || new Date(date) < new Date()) {
    return res.status(400).json({ error: "Event date must be in the future" });
  }
  
  next();
};

export const validateRegistration = (req, res, next) => {
  const { email, password } = req.body;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  
  if (!password || password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }
  
  next();
};