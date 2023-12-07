// code base
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Book = new Schema(
  {
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    author: { type: String },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("Book", Book);
