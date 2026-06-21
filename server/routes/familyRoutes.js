const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const Family = require("../models/Family");

const User = require("../models/User");


// ====================

const generateInviteCode = () => {

return Math.floor(

100000 + Math.random() * 900000

).toString();

};


// ==================== CREATE FAMILY

router.post(

"/create",

protect,

async (req,res)=>{

try{

const {name}=req.body;

if(!name){

return res.status(400).json({

message:"Family name is required",

});

}


const user=

await User.findById(

req.user._id

);


if(user.family){

return res.status(400).json({

message:"You already belong to a family",

});

}


const inviteCode=

generateInviteCode();


const family=

await Family.create({

name,

inviteCode,

admin:req.user._id,

members:[

{

user:req.user._id,

role:"admin",

},

],

});


user.family=

family._id;

await user.save();


res.status(201).json({

message:"Family created successfully",

family,

});

}

catch(error){

console.log(error);

res.status(500).json({

message:"Failed to create family",

error:error.message,

});

}

}

);


// ==================== JOIN FAMILY

router.post(

"/join",

protect,

async(req,res)=>{

try{

const {inviteCode}=req.body;


const family=

await Family.findOne({

inviteCode,

});


if(!family){

return res.status(404).json({

message:"Invalid invite code",

});

}


const alreadyMember=

family.members.find(

(member)=>

member.user.toString()===

req.user._id.toString()

);


if(alreadyMember){

return res.status(400).json({

message:"Already joined",

});

}


family.members.push({

user:req.user._id,

role:"member",

});


await family.save();


await User.findByIdAndUpdate(

req.user._id,

{

family:family._id,

}

);


res.json({

message:"Joined family successfully",

family,

});

}

catch(error){

console.log(error);

res.status(500).json({

message:"Join failed",

error:error.message,

});

}

}

);


// ==================== GET FAMILY DETAILS

router.get(

"/me",

protect,

async(req,res)=>{

try{

const user=

await User.findById(

req.user._id

);

if(!user.family){

return res

.status(404)

.json({

message:

"No family found",

});

}

const family=

await Family.findById(

user.family

)

.populate(

"admin",

"firstName lastName email"

)

.populate(

"members.user",

"firstName lastName email"

);


const currentMember=

family.members.find(

member=>

member.user._id

.toString()===

req.user._id

.toString()

);


res.json({

family,

members:

family.members,

currentMember:{

_id:req.user._id,

role:

currentMember?.role,

},

});

}

catch(error){

console.log(error);

res.status(500)

.json({

message:

"Failed to load family",

});

}

}

);

module.exports=router;