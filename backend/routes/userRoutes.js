const express = require('express');
const { getUsers, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");
const Project = require("../models/Project");


// GET ALL USERS
exports.getUsers = async(req,res)=>{

    try{

        const users = await User.find()
        .select("-password");


        res.json(users);

    }
    catch(error){

        res.status(500)
        .json({
            message:error.message
        });

    }

};



// GET CURRENT USER PROFILE
exports.getUserProfile = async(req,res)=>{

    try{


        // user id comes from JWT middleware
        const userId = req.user.id;



        // current user details
        const user = await User.findById(userId)
        .select("-password");



        if(!user){

            return res.status(404)
            .json({
                message:"User not found"
            });

        }



        // tasks assigned to current user
        const tasks = await Task.find({
            assignee:userId
        })
        .populate("project")
        .populate("assignee","name email");



        // projects of current user
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


        res.status(500)
        .json({

            message:error.message

        });


    }

};
router.get('/', protect, getUsers);
router.get('/profile', protect, getUserProfile);


module.exports = router;