const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); // Protected routes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
