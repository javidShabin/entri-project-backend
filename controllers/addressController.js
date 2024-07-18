const { Address } = require("../models/addressModel");

// Create address
const createAddress = async (req, res) => {
  try {
    // Destructur the data from req.body
    const { name, email, street, city, postalCode, country, phone } = req.body;
    const userId = req.user.id; // Get user id from req.user
    // Check if requird fields are presented
    if (!name || !street || !city || !postalCode || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // Add and save the address to datebade
    const address = new Address({
      name,
      email,
      street,
      city,
      postalCode,
      phone,
      country,
      user: userId,
    });
    await address.save();
    res.status(201).json(address); // Send the response including address
  } catch (error) {}
};
const updateAddress = async (req, res) => {
  try {
  } catch (error) {}
};
const getAddress = async (req, res) => {
  try {
  } catch (error) {}
};
const removeAddress = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  createAddress,
  updateAddress,
  getAddress,
  removeAddress,
};
