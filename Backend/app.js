const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors module
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { checkForToken, errorHandler } = require("./middleware/authMiddleware");

const app = express();
dotenv.config();

// Middleware to enable CORS
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Allowed methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Routes
app.use("/api/", checkForToken, authRoutes);
app.use("/api/user", userRoutes); // Protected routes

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
