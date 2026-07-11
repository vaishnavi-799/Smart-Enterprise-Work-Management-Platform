const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    description:String,

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },

    assignee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    status:{
        type:String,
        enum:["Pending","In Progress","Completed"],
        default:"Pending"
    },

    priority:{
        type:String,
        enum:["High","Medium","Low"],
        default:"Medium"
    },

    dueDate:Date,


    progress:{
        type:Number,
        default:0
    },


    checklist:[
        {
            text:String,
            done:{
                type:Boolean,
                default:false
            }
        }
    ],


    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            text:String,
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]

},
{
timestamps:true
});


module.exports = mongoose.model("Task",taskSchema);