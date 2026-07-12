const User = require("../models/User");
const Task = require("../models/Task");
const Project = require("../models/Project");


exports.getUsers = async(req,res)=>{

    try{

        const users = await User.find()
        .select("-password");

        res.json(users);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



exports.getUserProfile = async(req,res)=>{

    try{

        const userId = req.user._id;


        const user = await User.findById(userId)
        .select("-password");


        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }


        const tasks = await Task.find({
            assignee:userId
        });


        const projects = await Project.find({
            members:userId
        });


        res.json({
            user,
            tasks,
            projects
        });


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};