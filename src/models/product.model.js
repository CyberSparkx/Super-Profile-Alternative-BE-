const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  price: {
    ammount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD", "INR"],
      required: true,
      default: "INR"
    },
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  imageUrl: {
    type: [String], // array of strings (image URLs)
    validate: {
      validator: function (arr) {
        return arr.length <= 5;
      },
      message: "Maximum 5 images allowed",
    },
  },
  category:{
    type: String,
    enum: [ "Books", "Resources PDF"],
    required: true,
  },
  sales :{
    type: Number,
    default: 0,
  }
});
