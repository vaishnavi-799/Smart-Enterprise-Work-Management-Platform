const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) { res.json(user); } else { res.status(404); throw new Error('User not found'); }
});

module.exports = { getUsers, getUserProfile };