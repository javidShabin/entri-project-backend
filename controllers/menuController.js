const { cloudinaryInstance } = require("../config/cloudinaryConfig");
const { Menu } = require("../models/menuModel");

// Create a menu
const createMenuItem = async (req, res) => {
  try {
    // Get data from req.body
    const { restaurantId, name, ...rest } = req.body;
    // check if required fileds present
    if (!restaurantId || !name || Object.keys(rest).length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if have any same menu item
    const existMenuItem = await Menu.findOne({ restaurantId, name });
    if (existMenuItem) {
      return res.status(409).json({ message: "Item already exists" });
    }
    // add image file clodinery and get from cloudinery
    if (req.file) {
      console.log("Uploading file to Cloudinary...");
      uploadResult = await cloudinaryInstance.uploader.upload(req.file.path);
      console.log("Upload result:", uploadResult);
    } else {
      console.log("No file to upload.");
    }
    // Save menu data to database
    const newItem = new Menu({
      restaurantId,
      name,
      ...rest,
      image: uploadResult.secure_url || "",
    });
    const saveMenuItem = await newItem.save();
    res.status(201).json(saveMenuItem);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get the menu for a restaurant
const getMenuforRestaurant = async (req, res) => {
  try {
    // Get the restaurant id from req.params
    const { restaurantId } = req.params;
    // Find the menus using restaurant id
    const menus = await Menu.find({ restaurantId });
    if (!menus) {
      return res.status(401).json({ message: "Menus not found" });
    }
    // Else send the menu items as resonse
    res.status(200).json({ success: true, menus });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Get menu by category
const getMenusByCategory = async (req, res) => {
  try {
    // Destructure restaurantId, category
    const { restaurantId, category } = req.params;
    // Find menu from catagory using catagory
    const menus = await Menu.find({ restaurantId, category });
    // Check the category in the menu items
    if (menus.length === 0) {
        return res.status(401).json({message: "The category not found"})
    }
    res.status(200).json({ success: true, menus });
  } catch (error) {}
};
// Search menu By name
const searchMenuByName = async (req, res) => {
  try {
  } catch (error) {}
};
// Filter menu by price
const filterMenusByPrice = async (req, res) => {
  try {
  } catch (error) {}
};
// Update a menu item
const updateMenu = async (req, res) => {
  try {
  } catch (error) {}
};
// Delete a menu item
const deleteMenu = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  createMenuItem,
  getMenuforRestaurant,
  getMenusByCategory,
  searchMenuByName,
  filterMenusByPrice,
  updateMenu,
  deleteMenu,
};
