const mongoose = require("mongoose");
require("dotenv").config();

const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const mongoURI =
  "mongodb+srv://vsharshi233:S3B3LylnRJ5xJYwD@gofood.nl6vcjl.mongodb.net/gofooddb?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");

    const FoodItem = mongoose.model(
      "food_items",
      new mongoose.Schema({
        name: String,
        img: String,
        description: String,
      })
    );

    // Specify the collection name explicitly as "food_cat"
    const FoodCategory = mongoose.model(
      "FoodCategory",
      new mongoose.Schema({
        CategoryName: String,
      }),
      "food_cat"
    );

    const foodItems = await FoodItem.find({}).exec();
    const foodCategories = await FoodCategory.find({}).exec();

    global.foodItems = foodItems;
    global.foodCategories = foodCategories;

    // console.log("Food Items:", global.foodItems);
    // console.log("Food Categories:", global.foodCategories);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

module.exports = mongoDB;
