const sql = require("mssql");

// Create a new chat
const createChat = async (createdBy, serviceId, ChatName) => {
  try {
    if (!ChatName) throw new Error("ChatName is required");

    const createdByValue =
      typeof createdBy === "string" ? `'${createdBy}'` : createdBy;
    const serviceIdValue = serviceId ? `'${serviceId}'` : "NULL";
    const chatNameValue = `'${ChatName.replace(/'/g, "''")}'`; // Escape single quotes for SQL safety

    // Query to insert into the Chats table with ChatName
    let query = `
      INSERT INTO Chats (created_by, service_id, chatName) 
      VALUES (${createdByValue}, ${serviceIdValue}, ${chatNameValue});

      SELECT TOP 1 Id FROM Chats WHERE created_by = ${createdByValue} AND chatName = ${chatNameValue} ORDER BY created_at DESC;
    `;

    // Execute query and return the new chat ID
    const result = await sql.query(query);
    if (result.recordset && result.recordset.length > 0) {
      return result.recordset[0].Id;
    } else {
      throw new Error("Chat creation failed, no ChatID returned.");
    }
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
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
  await sql.query`
    UPDATE Messages
    SET status_uuid = (select id from message_status where status =  '${status}' ) 
    WHERE id = ${messageId};
  `;
};
const getChatById = async (chatId) => {
  try {
    // Ensure chatId is valid
    if (!chatId) {
      throw new Error("Chat ID is required.");
    }

    // Use parameterized query to prevent SQL injection
    const query = `
     SELECT 
    c.id AS chat_id,
    creator.email AS created_by,
    c.created_at,
    ISNULL(s.name, '') AS service_name,
    ISNULL(s.category, '') AS service_category,
    ISNULL(s.price, 0) AS service_price,
    ISNULL(s.description, '') AS service_description,
    (
        SELECT 
            u.id AS user_id,
            u.name AS user_name,
            u.email AS user_email,
            u.phone AS user_phone
        FROM chat_participants cp
        JOIN users u ON cp.user_id = u.id
        WHERE cp.chat_id = c.id
        FOR JSON PATH
    ) AS participants
FROM chats c
LEFT JOIN services s ON c.service_id = s.id
LEFT JOIN users creator ON c.created_by = creator.id
WHERE c.id = @chatId
    `;

    // Execute query using parameterized input
    const pool = await sql.connect(); // Ensure you're connected to the DB
    const result = await pool
      .request()
      .input("chatId", chatId) // Use parameterized query
      .query(query);

    if (!result.recordset || result.recordset.length === 0) {
      throw new Error("Chat not found.");
    }

    // Extract the JSON string from the recordset
    const chatJson = result.recordset[0];

    // Ensure we properly parse the JSON string
    const chatData =
      typeof chatJson === "string" ? JSON.parse(chatJson) : chatJson;

    // Parse the participants field if it exists and is a valid JSON string
    if (chatData.participants && typeof chatData.participants === "string") {
      chatData.participants = JSON.parse(chatData.participants);
    }

    return chatData;
  } catch (error) {
    console.error("Error in getChatById:", error.message);
    throw new Error("Error fetching chat data.");
  }
};
module.exports = {
  createChat,
  addParticipant,
  getChatsForUser,
  sendMessage,
  getMessagesForChat,
  updateMessageStatus,
  getChatById,
};
