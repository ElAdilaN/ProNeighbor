const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createChat,
  getChatsForUser,
  sendMessage,
  getMessagesForChat,
  addParticipant,
  updateMessageStatus,
} = require("../controllers/messageController");

const router = express.Router();

// Create a new chat
router.post("/chat", protect, createChat);

// Get all chats for the logged-in user
router.get("/chats", protect, getChatsForUser);

// Send a message
router.post("/message", protect, sendMessage);

// Get messages for a chat with pagination
router.get("/chat/:chatId/messages", protect, getMessagesForChat);

// Add participant to a chat
router.post("/chat/participant", protect, addParticipant);

// Update message status
router.put("/message/:messageId/status", protect, updateMessageStatus);

module.exports = router;
