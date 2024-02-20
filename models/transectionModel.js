const mongoose = require("mongoose");

const transectionSchema = new mongoose.Schema(
  {

    userId: {
      type: String,
      require: [false],
    },
    amount: {
      type: Number,
      require: [false, "amount is require"],
    },
    type: {
      type: String,
      require: [false, "type is require"],
    },
    category: {
      type: String,
      require: [false, "category is require"],
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
      require: [false, "description is require"],
    },
    date: {
      type: Date,
      require: [false, "Date is require"],
    },
  },
  { timestamps: false }
);
const transectionModel = mongoose.model("transections", transectionSchema);
module.exports = transectionModel;