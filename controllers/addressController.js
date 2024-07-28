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
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateAddress = async (req, res) => {
  try {
    const addressId = req.params.id; //Address id from req.params
    const updatedData = req.body; // Updated address form req.body

    // Find and add the updated address using id
    const address = await Address.findByIdAndUpdate(addressId, updatedData, {
      new: true,
    });
    res.status(200).json(address); // Send the resonse the updated uddress
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAddress = async (req, res) => {
  try {
    const userId = req.user.id; // Get user id from reql.user
    // Get the address using address id
    const addresses = await Address.find({ user: userId });
    // Send the response includig address
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json(error);
  }
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
