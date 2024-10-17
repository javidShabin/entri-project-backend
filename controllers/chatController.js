// Send message
const sendMessage = async (req, res) => {
  try {
    // Destructure the user id messahe and sender from req.body
    const { userId, message, sender } = req.body;
    // Check if the sender is admin or user
    const newMessage = new Chat({
      user: userId, // User to whom the message is being sent
      message,
      sender, // 'admin' or 'user', depends on who is sending
    });
    // Save the message to datahase
    await newMessage.save();
    res.status(201).json(newMessage); // Send the response including message
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};
// Get chat history
const getChatHistory = async (req, res) => {
  try {
    // Destructure user id from req.params
    const { userId } = req.params;
    // Fetch all chat messages between the admin and the specific user
    const chatMessages = await Chat.find({ user: userId }).sort({
      createdAt: 1,
    });
    // send the response
    res.status(200).json(chatMessages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};
// Fetch a list of all users who have chatted with the admin
const getUsersWithChats = async (req, res) => {
  try {
    // Fetch distinct users from the chat model
    const usersWithChats = await Chat.distinct("user");
    // Optionally, get more details for each user (e.g., name, email)
    const users = await User.find({ _id: { $in: usersWithChats } }).select(
      "name email"
    );
    // Send the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users with chats" });
  }
};
// Clear all chats for a specific user
const removeAllChats = async (req, res) => {
  try {
  } catch (error) {}
};
module.exports = {
  sendMessage,
  getChatHistory,
  getUsersWithChats,
  removeAllChats,
};
