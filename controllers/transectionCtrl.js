const transectionModel = require("../models/transectionModel");
const moment = require("moment");
const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transections = await transectionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userId: req.body.userId,
      ...(type !== "all" && { type }),
    });

    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTransection = async(req,res) => {
  try{
    await transectionModel.findOneAndDelete({_id: req.body.transectionId})
    res.status(200).send('Transection Deleted')
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
const editTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndUpdate(
      { _id: req.body.transectionId },
      req.body.payload
    );
    res.status(200).send("Edit successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransection = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Data integrity check: Ensure that the user ID is a non-empty string
    if (!userId || typeof userId !== "string" || userId.trim() === "") {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).send("Transection Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTransection, addTransection, editTransection, deleteTransection};
