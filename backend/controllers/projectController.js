const asyncHandler = require('../utils/asyncHandler');
const Project = require('../models/Project');
const Activity = require('../models/Activity');

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).populate('team', 'name initials color');
  res.json(projects);
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('team', 'name initials color');
  if (!project) { res.status(404); throw new Error('Project not found'); }
  res.json(project);
});

const createProject = asyncHandler(async (req, res) => {
  const { name, priority, status, progress, dueDate, teamInitials } = req.body;
  
  const project = new Project({ name, priority, status, progress, dueDate });
  await project.save();

  await Activity.create({ user: req.user._id, action: `created new project`, details: `"${name}"` });
  res.status(201).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) { res.status(404); throw new Error('Project not found'); }

  Object.assign(project, req.body);
  const updatedProject = await project.save();

  await Activity.create({ user: req.user._id, action: `updated project details for`, details: `"${project.name}"` });
  res.json(updatedProject);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) { res.status(404); throw new Error('Project not found'); }

  await project.deleteOne();
  await Activity.create({ user: req.user._id, action: `deleted project`, details: `"${project.name}"` });
  res.json({ message: 'Project removed successfully' });
});

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };