const sql = require("mssql");

// Create a new chat
const createChat = async (createdBy, serviceId) => {
  try {
    // Handle createdBy and serviceId as necessary (quotes for strings)
    const createdByValue =
      typeof createdBy === "string" ? `'${createdBy}'` : createdBy;
    const serviceIdValue = serviceId
      ? typeof serviceId === "string"
        ? `'${serviceId}'`
        : serviceId
      : null;

    // Building query dynamically
    let query = `
  INSERT INTO Chats (created_by ${serviceId ? ", ServiceId" : ""}) 
  VALUES (${createdByValue}${serviceIdValue ? `, ${serviceIdValue}` : ""});

  SELECT TOP 1 Id FROM Chats WHERE created_by = ${createdByValue} ORDER BY created_at DESC;
`;

    // Debug: Log the query to verify correctness

    // Execute the query
    const result = await sql.query(query);
    // Check if result.recordset is not empty
    if (result.recordset && result.recordset.length > 0) {
      return result.recordset[0].Id;
    } else {
      throw new Error("Chat creation failed, no ChatID returned");
    }
  } catch (error) {
    console.error("Error creating chat:", error);
    throw new Error("Failed to create chat");
  }
};

// Add participant to chat
const addParticipant = async (chatId, userId) => {
  try {
    console.log("chatid", chatId);
    console.log("userid", userId);
    // Manually construct the query string to log it for debugging
    console.log(`
  INSERT INTO chat_participants (chat_id, user_id)
  VALUES ('${chatId}', '${userId}');
`);
    const query = `
      INSERT INTO chat_participants (chat_id, user_id)
      VALUES ('${chatId}', '${userId}');
    `;

    // Log the query for debugging
    console.log("Executing Query:", query);

    // Execute the SQL query to insert the participant into the chat
    await sql.query(query);

    console.log("Participant added successfully");
  } catch (error) {
    // Catch any errors and log them
    console.error("Error adding participant:", error);
    throw new Error("Failed to add participant"); // Optional: throw the error again for further handling
  }
};
// Get all chats for a user
const getChatsForUser = async (userId) => {
  const result = await sql.query`
    SELECT c.*
    FROM Chats c
    INNER JOIN chat_participants cp ON c.id = cp.chat_id
    WHERE cp.user_id = ${userId}
    ORDER BY c.created_at DESC;
  `;
  return result.recordset;
};

// Send a message
const sendMessage = async (chatId, senderId, messageContent) => {
  await sql.query`
    INSERT INTO messages (chat_id , user_id , message )
    VALUES (${chatId}, ${senderId}, ${messageContent});
  `;
};

// Get messages for a chat with pagination
const getMessagesForChat = async (chatId, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await sql.query`
    SELECT * FROM Messages
    WHERE chat_id = ${chatId}
    ORDER BY timestamp DESC
    OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
  `;
  return result.recordset;
};

// Update message status
const updateMessageStatus = async (messageId, status) => {
  console.log(`
    UPDATE Messages
    SET status_uuid = (select id from message_status where status =  '${status}' ) 
    WHERE id = ${messageId};
  `);

  await sql.query`
    UPDATE Messages
    SET status_uuid = (select id from message_status where status =  '${status}' ) 
    WHERE id = ${messageId};
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
