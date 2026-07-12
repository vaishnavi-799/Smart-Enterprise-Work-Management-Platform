const asyncHandler = require('../utils/asyncHandler');
const Project = require('../models/Project');
const Activity = require('../models/Activity');

const getProjects = asyncHandler(async (req, res) => {

    const projects = await Project.find({
        createdBy: req.user._id
    });

    res.json(projects);

});

const getProjectById = asyncHandler(async (req, res) => {

    const project = await Project.findOne({

        _id:req.params.id,

        createdBy:req.user._id

    });


    if(!project){

        res.status(404);

        throw new Error("Project not found");

    }


    res.json(project);

});

const createProject = asyncHandler(async (req,res)=>{

    const {
        name,
        priority,
        status,
        progress,
        dueDate
    } = req.body;


    const project = new Project({

        name,

        priority,

        status,

        progress,

        dueDate,


        // logged-in user
        createdBy:req.user._id

    });


    await project.save();



    await Activity.create({

        user:req.user._id,

        action:"created new project",

        details:`"${name}"`

    });


    res.status(201).json(project);

});

const updateProject = asyncHandler(async (req, res) => {
  
  const project = await Project.findOne({

    _id:req.params.id,

    createdBy:req.user._id

});
  if (!project) { res.status(404); throw new Error('Project not found'); }

  Object.assign(project, req.body);
  const updatedProject = await project.save();

  await Activity.create({ user: req.user._id, action: `updated project details for`, details: `"${project.name}"` });
  res.json(updatedProject);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({

    _id:req.params.id,

    createdBy:req.user._id

});
  if (!project) { res.status(404); throw new Error('Project not found'); }

  await project.deleteOne();
  await Activity.create({ user: req.user._id, action: `deleted project`, details: `"${project.name}"` });
  res.json({ message: 'Project removed successfully' });
});

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };