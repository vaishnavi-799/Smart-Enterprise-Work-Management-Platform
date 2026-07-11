const mongoose=require("mongoose");


const projectSchema=new mongoose.Schema({

name:String,

description:String,

priority:{
type:String,
default:"Medium"
},

status:{
type:String,
default:"In Progress"
},

progress:{
type:Number,
default:0
},

dueDate:Date,


createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

members:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
]


},
{
timestamps:true
});


module.exports=mongoose.model("Project",projectSchema);