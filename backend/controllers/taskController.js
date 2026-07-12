const asyncHandler = require("express-async-handler");

const Task = require("../models/Task");


// ===============================
// GET ALL TASKS
// ===============================

const getTasks = asyncHandler(async (req, res) => {

    const tasks = await Task.find({
        assignee: req.user._id
    })
    .populate("project")
    .populate("assignee")
    .populate("comments.user");


    res.json(tasks);

});



// ===============================
// GET SINGLE TASK
// ===============================

const getTaskById = asyncHandler(async (req, res) => {


    const task = await Task.findById(req.params.id)
        .populate("project")
        .populate("assignee")
        .populate("comments.user");


    if(!task){

        res.status(404);

        throw new Error("Task not found");

    }


    res.json(task);


});



// ===============================
// CREATE TASK
// ===============================

const createTask = asyncHandler(async(req,res)=>{

const task = await Task.create({

title:req.body.title,

description:req.body.description || "",

project:req.body.project || null,

assignee:req.user._id,

status:req.body.status || "Pending",

priority:req.body.priority || "Medium",

dueDate:req.body.dueDate || null

});


res.status(201).json(task);

});



// ===============================
// ADD COMMENT
// ===============================

const addComment = asyncHandler(async (req, res) => {


    const task = await Task.findById(req.params.id);



    if (!task) {

        res.status(404);

        throw new Error("Task not found");

    }



    task.comments.push({

        text:req.body.text,

        user:req.user?._id

    });



    await task.save();



    res.status(200).json(task);


});



// ===============================
// UPDATE TASK
// ===============================

const updateTask = asyncHandler(async(req,res)=>{


    const task = await Task.findById(req.params.id);



    if(!task){

        res.status(404);

        throw new Error("Task not found");

    }



    task.title = req.body.title || task.title;

    task.description = req.body.description || task.description;

    task.project = req.body.project || task.project;

    task.assignee = req.body.assignee || task.assignee;

    task.status = req.body.status || task.status;

    task.priority = req.body.priority || task.priority;

    task.dueDate = req.body.dueDate || task.dueDate;

    task.checklist = req.body.checklist || task.checklist;



    await task.save();



    res.json(task);


});




// ===============================
// DELETE TASK
// ===============================

const deleteTask = asyncHandler(async(req,res)=>{


    const task = await Task.findById(req.params.id);



    if(!task){

        res.status(404);

        throw new Error("Task not found");

    }



    await task.deleteOne();



    res.json({

        message:"Task deleted successfully"

    });


});




// EXPORTS

module.exports = {

    getTasks,

    getTaskById,

    createTask,

    addComment,

    updateTask,

    deleteTask

};