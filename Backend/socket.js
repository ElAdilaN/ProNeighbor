const { Server } = require("socket.io");
const messageModel = require("./models/messageModel");

let io;

module.exports = {
  init: (server) => {
    io = new Server(server, {
      cors: {
        origin: "*", // Adjust this based on your frontend origin
      },
    });

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("sendMessage", async (data) => {
        console.log("Backend received sendMessage event:", data);

        const { chatId, message, user_id } = data; // Ensure user_id is received

        console.log("Parsed data:", { chatId, message, user_id });
        if (!chatId || !message || !user_id) {
          return;
        }

        console.log("Saving message to DB...");
        // Save to DB
        await messageModel.sendMessage(chatId, user_id, message);

        console.log("Message saved to DB.");
        const newMessage = {
          chatId,
          user_id, // Ensure user_id is included
          message,
          timestamp: new Date(),
        };

        console.log("Emitting message:", newMessage);
        io.emit("newMessage", newMessage);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
