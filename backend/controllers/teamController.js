const asyncHandler = require('../utils/asyncHandler');
const Team = require('../models/Team');

const getTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find({}).populate('members lead', 'name email initials color isOnline');
  res.json(teams);
});

const createTeam = asyncHandler(async (req, res) => {
  const { name, description, members, lead } = req.body;
  const team = await Team.create({ name, description, members, lead });
  res.status(201).json(team);
});

module.exports = { getTeams, createTeam };