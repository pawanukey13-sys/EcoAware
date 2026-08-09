const express = require("express");
const router = express.Router();
const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const verifyToken = require("../Middlware/auth.middlware");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15d" },
  );
};
router.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    const { name, email, password } = req.body;
    const isAlreadyRegister = await userModel.findOne({
      $or: [{ name }, { email }],
    });
    if (isAlreadyRegister) {
      return res.status(409).json({
        message: "User already exist ",
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,50}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, number and special character.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user);
    res.status(201).json({
      message: "Account Created",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        Error: "Email and Password are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ Error: "Invalid email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    const token = generateToken(user);
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
