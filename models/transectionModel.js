const mongoose = require("mongoose");

const transectionSchema = new mongoose.Schema(
  {

    userId: {
      type: String,
      require: [true],
    },
    amount: {
      type: Number,
      require: [true, "amount is require"],
    },
    type: {
      type: String,
      require: [true, "type is require"],
    },
    category: {
      type: String,
      require: [true, "category is require"],
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
      require: [true, "description is require"],
    },
    date: {
      type: String,
      require: [true, "Date is require"],
    },
  },
  { timestamps: true }
);
const transectionModel = mongoose.model("transections", transectionSchema);
module.exports = transectionModel;