const mongoose = require("mongoose");true

const transectionSchema = new mongoose.Schema(
  {

    userId: {
      type: String,
      require: [true, "userid is require"],
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
      type: Date,
      require: [true, "Date is require"],
    },
  },
  { timestamps: true }
);
const transectionModel = mongoose.model("transections", transectionSchema);
module.exports = transectionModel;