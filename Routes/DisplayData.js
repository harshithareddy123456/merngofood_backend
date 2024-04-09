const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    res.send([global.foodItems, global.foodCategories]);
  } catch (error) {
    console.error(error.messege);
    res.send("Server error");
  }
});

module.exports = router;
