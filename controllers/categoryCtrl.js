const categoryModel = require("../models/categorymodel");

const allCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

//Category callback
const deleteCategory = async (req, res) => {
  try {
    await categoryModel.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).send("Category Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const editCategory = async (req, res) => {
  try {
    const { categoryId, payload } = req.body;
    const updatedCategory = await categoryModel.findOneAndUpdate(
      { _id: categoryId },
      payload,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).send("Category not found");
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryNameLowerCase = name.toLowerCase(); 

    // Search for existing category case insensitively
    const category = await categoryModel.findOne({ name: { $regex: new RegExp('^' + categoryNameLowerCase + '$', 'i') } });

    // const { name } = req.body;
    // const category = await categoryModel.findOne({ name });
    if (category) {
      return res.status(403).send("Category Already Exist");
    }

    const newCategory = new categoryModel(req.body);
    await newCategory.save();
    return res.status(201).send("Category Created");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { allCategory, deleteCategory, editCategory, addCategory };
