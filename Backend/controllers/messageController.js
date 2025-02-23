const messageModel = require("../models/messageModel");
const socket = require("../socket"); // Import the socket module

// Create a new chat
exports.createChat = async (req, res, next) => {
  try {
    const { serviceId, ChatName } = req.body; // Now receiving ChatName
    const createdBy = req.user.id; // User from JWT

    if (!ChatName) {
      return res.status(400).json({ message: "ChatName is required." });
    }

    console.log("Creating chat with name:", ChatName);

    // Create chat and get the new chat ID, pass ChatName
    const chatId = await messageModel.createChat(
      createdBy,
      serviceId,
      ChatName
    );
    console.log("Created chat ID:", chatId);

    // Add creator as a participant
    await messageModel.addParticipant(chatId, createdBy);

    res.status(201).json({ message: "Chat created successfully", chatId });
  } catch (error) {
    console.error("Error in createChat:", error);
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
  console.log("HTTP sendMessage called with:", req.body);
  const { chatId, message } = req.body;
  try {
    const { chatId, message } = req.body;
    const senderId = req.user.id; // Ensure this is coming from authentication middleware

    console.log("Parsed data from HTTP:", { chatId, message, senderId });
    if (!message || !chatId) {
      console.log("Invalid message request");
      return res.status(400).json({ message: "Invalid message request" });
    }

    console.log("Saving HTTP message to DB...");
    // Save message to database
    await messageModel.sendMessage(chatId, senderId, message);
    console.log("HTTP message saved.");
    const newMessage = {
      chatId,
      user_id: senderId, // Ensure user_id is included
      message,
      timestamp: new Date(),
    };

    console.log("Emitting HTTP newMessage:", newMessage);
    // Emit message via Socket.io
    const io = socket.getIO();
    io.emit("newMessage", newMessage);

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
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
exports.getChatInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("data ", id);
    const chatData = await messageModel.getChatById(id);

    if (!chatData) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Send the result as JSON response
    res.status(200).json(chatData);
  } catch (error) {
    next(error);
  }
};
