const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menu");

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const savedMenuItem = await newMenuItem.save();
    console.log("Menu item added successfully:", savedMenuItem);
    res.status(200).json(savedMenuItem);
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
