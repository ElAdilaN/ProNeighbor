const sql = require("mssql");

// Create a new chat
const createChat = async (chatName, createdBy) => {
  const result = await sql.query`
    INSERT INTO Chats (ChatName, CreatedBy) 
    VALUES (${chatName}, ${createdBy});
    SELECT SCOPE_IDENTITY() AS ChatID;
  `;
  return result.recordset[0].ChatID;
};

// Add participant to chat
const addParticipant = async (chatId, userId) => {
  await sql.query`
    INSERT INTO ChatParticipants (ChatID, UserID)
    VALUES (${chatId}, ${userId});
  `;
};

// Get all chats for a user
const getChatsForUser = async (userId) => {
  const result = await sql.query`
    SELECT c.*
    FROM Chats c
    INNER JOIN ChatParticipants cp ON c.ChatID = cp.ChatID
    WHERE cp.UserID = ${userId}
    ORDER BY c.CreatedAt DESC;
  `;
  return result.recordset;
};

// Send a message
const sendMessage = async (chatId, senderId, messageContent) => {
  await sql.query`
    INSERT INTO Messages (ChatID, SenderID, Content)
    VALUES (${chatId}, ${senderId}, ${messageContent});
  `;
};

// Get messages for a chat with pagination
const getMessagesForChat = async (chatId, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await sql.query`
    SELECT * FROM Messages
    WHERE ChatID = ${chatId}
    ORDER BY CreatedAt DESC
    OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
  `;
  return result.recordset;
};

// Update message status
const updateMessageStatus = async (messageId, status) => {
  await sql.query`
    UPDATE Messages
    SET Status = ${status}
    WHERE MessageID = ${messageId};
  `;
};

module.exports = {
  createChat,
  addParticipant,
  getChatsForUser,
  sendMessage,
  getMessagesForChat,
  updateMessageStatus,
};
