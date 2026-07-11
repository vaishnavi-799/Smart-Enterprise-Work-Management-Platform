const User=require("../models/User");

const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");



exports.register=async(req,res)=>{


try{

const {
name,
email,
password
}=req.body;


const hash=await bcrypt.hash(password,10);


const user=await User.create({

name,
email,
password:hash

});


res.json(user);


}

catch(error){

res.status(500).json({
message:error.message
});

}

};




exports.login=async(req,res)=>{


const {
email,
password
}=req.body;



const user=await User.findOne({email});


if(!user)
return res.status(404).json({
message:"User not found"
});



const match=
await bcrypt.compare(password,user.password);



if(!match)
return res.status(401).json({
message:"Invalid password"
});



const token=
jwt.sign(
{
id:user._id
},
process.env.JWT_SECRET,
{
expiresIn:"1d"
}
);



res.json({

token,

user:{
id:user._id,
name:user.name,
email:user.email
}

});


};