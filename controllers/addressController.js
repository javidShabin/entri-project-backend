const { Address } = require("../models/addressModel");

// Create address
const createAddress = async (req, res) => {
  try {
    const { name, email, street, city, postalCode, country, phone } = req.body;
    const userId = req.user.id;

    // Check for required fields
    if (!name || !street || !city || !postalCode || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the new address
    const address = await Address.create({
      name,
      email,
      street,
      city,
      postalCode,
      country,
      phone,
      user: userId,
    });
    res.status(201).json({ message: "Address created successfully", address });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update address
const updateAddress = async (req, res) => {
  try {
    const { id: addressId } = req.params;
    const { user, ...updatedData } = req.body; // Avoid updating user field directly

    const address = await Address.findByIdAndUpdate(addressId, updatedData, {
      new: true,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address updated successfully", address });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get addresses
const getAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await Address.find({ user: userId });

    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove address
const removeAddress = async (req, res) => {
  try {
    const { id: addressId } = req.params;

    const address = await Address.findByIdAndDelete(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createAddress,
  updateAddress,
  getAddress,
  removeAddress,
};
