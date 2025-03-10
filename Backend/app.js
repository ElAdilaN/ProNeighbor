const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const http = require("http");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { errorHandler } = require("./middleware/authMiddleware");
const socket = require("./socket");

dotenv.config();
const app = express();

// Middleware to enable CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    exposedHeaders: "Authorization",
  })
);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  headers: true,
});

// Apply global limiter to all routes
app.use(globalLimiter);

// Middleware for parsing JSON
app.use(bodyParser.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Create HTTP server and attach Socket.io
const server = http.createServer(app);

// Initialize Socket.io
socket.init(server);

// Start the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
