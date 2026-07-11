const express = require('express');
const { getTeams, createTeam } = require('../controllers/teamController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/').get(protect, getTeams).post(protect, createTeam);

module.exports = router;