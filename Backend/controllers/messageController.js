const messageModel = require("../models/messageModel");

// Create a new chat
exports.createChat = async (req, res, next) => {
  try {
    const { serviceId } = req.body; // Optionally serviceId
    const createdBy = req.user.id; // User from JWT
    console.log("id", createdBy);
    // Create chat and get the new chat ID
    const chatId = await messageModel.createChat(createdBy, serviceId);
    console.log("chaaatid", chatId);
    // Add creator to participants
    await messageModel.addParticipant(chatId, createdBy); // Add creator to participants

    res.status(201).json({ message: "Chat created successfully", chatId });
  } catch (error) {
    next(error);
  }
};
// Get chats for a user
exports.getChatsForUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const chats = await messageModel.getChatsForUser(userId);

    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

// Send a message
exports.sendMessage = async (req, res, next) => {
  try {
    const { chatId, message } = req.body;
    const senderId = req.user.id;

    if (!message) {
      return res.status(400).json({ message: "Message content is required" });
    }
    if (!chatId) {
      return res.status(400).json({ message: "Chat id  is required" });
    }
    await messageModel.sendMessage(chatId, senderId, message);
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    next(error);
  }
};

// Get messages for a chat with pagination
exports.getMessagesForChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const messages = await messageModel.getMessagesForChat(chatId, page, limit);
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

// Add participant to chat
exports.addParticipant = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;

    if (!chatId) {
      return res.status(400).json({ message: "chatId is required" });
    }
    if (!userId) {
      return res.status(400).json({ message: "userId  is required" });
    }
    await messageModel.addParticipant(chatId, userId);
    res.status(200).json({ message: "Participant added successfully" });
  } catch (error) {
    next(error);
  }
};

// Update message status
exports.updateMessageStatus = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const { status } = req.body;

    const validStatuses = ["sent", "delivered", "read"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    await messageModel.updateMessageStatus(messageId, status);
    res.status(200).json({ message: "Message status updated successfully" });
  } catch (error) {
    next(error);
  }
};
