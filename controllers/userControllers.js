// Explicitly Destructure Allowed Fields in the Controller
// DEPENDENCIES
const User = require('../models/Users'); 

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create and store as registeredUser (avoids variable collision)
    const registeredUser = await User.create({
      name,
      email,
      password
    });

    // 3. Return the registered user details
    return res.status(201).json({
      _id: registeredUser._id,
      name: registeredUser.name,
      email: registeredUser.email,
      role: registeredUser.role
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser };