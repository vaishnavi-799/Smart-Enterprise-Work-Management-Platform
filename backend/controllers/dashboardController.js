const asyncHandler = require('../utils/asyncHandler');
const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');
const Activity = require('../models/Activity');

// @desc    Get consolidated metrics for the frontend landing hub page
// @route   GET /api/dashboard/metrics
const getDashboardMetrics = asyncHandler(async (req, res) => {
  const activeProjects = await Project.countDocuments({ status: 'In Progress' });
  const highPriority = await Project.countDocuments({ priority: 'High' });
  const medPriority = await Project.countDocuments({ priority: 'Medium' });
  
  // Specific to the logged-in session user's assignments
  const myTasksCount = await Task.countDocuments({ assignee: req.user._id, status: { $ne: 'Completed' } });
  const onlineMembers = await User.countDocuments({ isOnline: true });

  const activities = await Activity.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('user', 'name initials color');

  const activityFeedCleaned = activities.map(act => ({
    user: act.user?.name || 'System',
    avatar: act.user?.initials || 'SYS',
    color: act.user?.color || 'bg-slate-500',
    action: act.action,
    details: act.details,
    time: act.createdAt
  }));

  res.json({
    stats: { activeProjects, highPriority, medPriority, myTasksCount, onlineMembers },
    activities: activityFeedCleaned
  });
});

module.exports = { getDashboardMetrics };