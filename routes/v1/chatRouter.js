const express = require("express");
const {
  sendMessage,
  getChatHistory,
  getUsersWithChats,
  removeAllChats,
} = require("../../controllers/chatController");
const router = express.Router();

// Send message
router.post("/send", sendMessage);
// Chat history specific user
router.get("/history/:userId", getChatHistory);
// All user chat list
router.get("/users", getUsersWithChats);
// Clear all chat a specific user
router.delete("/remove/:userId", removeAllChats);

module.exports = { chatRouter: router };
