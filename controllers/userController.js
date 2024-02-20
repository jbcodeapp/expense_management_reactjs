const userModel = require("../models/userModel");

//Login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      res.status(404).send("User Not Found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register callback
const registerController = async(req,res) => {
  try {
    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
        res.status(201).json({
          success: true,
          newUser,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error ,       
         });
      }
};

module.exports = { loginController, registerController };
