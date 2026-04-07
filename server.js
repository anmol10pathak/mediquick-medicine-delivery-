const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// -------------------------
// MongoDB connection
// -------------------------
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/medicineApp");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
connectDB();

// -------------------------
// User Schema
// -------------------------
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  isAdmin: { type: Boolean, default: false }, // ✅ admin field
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// -------------------------
// Register Endpoint
// -------------------------
app.post("/api/register", async (req, res) => {
  const { name, email, password, phone, isAdmin } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword, phone, isAdmin: !!isAdmin });
  await newUser.save();

  res.json({ message: "User registered successfully" });
});

// -------------------------
// Login Endpoint
// -------------------------
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // ✅ Include isAdmin in response
  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
    },
  });
});

// -------------------------
// Get all users (Admin only)
// -------------------------
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// -------------------------
// Start Server
// -------------------------
app.listen(5000, () => console.log("Server running on port 5000"));