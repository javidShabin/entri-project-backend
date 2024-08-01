const express = require("express")
const router = express.Router()

// Send message
router.post("/send", );
// Chat history specific user
router.get("/history/:userId", );
// All user chat list
router.get("/users", );
// Clear all chat a specific user
router.delete("/remove/:userId", );


module.exports = {chatRouter : router}