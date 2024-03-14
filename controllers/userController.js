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

//change password
const changePasswordController = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you pass the user ID in the URL
    const { currentPassword, newPassword } = req.body;

    // Fetch the user from the database based on the userId
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    // Verify if the current password provided matches the user's current password
    if (user.password !== currentPassword) {
      return res.status(400).send("Current password is incorrect");
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).send("Password updated successfully");
  } catch (error) {
    // Handle any errors that occur during the password change process
    res.status(400).json({
      success: false,
      error,
    });
  }
}


//Register callback
const registerController = async(req,res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email is already registered"
      });
    }
    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    if (!newUser) {
      throw new Error("Failed to create user.");
    }
        res.status(201).json({
          success: true,
          newUser,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: "An error occurred. Please try again later."
        });
      }
};

module.exports = { loginController, registerController, changePasswordController };
