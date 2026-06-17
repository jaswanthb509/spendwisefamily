const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

const User = require("../models/User");


/* =======================
   GENERATE JWT TOKEN
======================= */

const generateToken = (id) => {

return jwt.sign(

{ id },

process.env.JWT_SECRET,

{

expiresIn:"7d",

}

);

};


/* =======================
   REGISTER
======================= */

router.post(

"/register",

async(req,res)=>{

try{

const {

firstName,

lastName,

email,

password,

} = req.body;


/* Validation */

if(

!firstName ||

!lastName ||

!email ||

!password

){

return res

.status(400)

.json({

message:

"Please fill all fields",

});

}


const existingUser =

await User.findOne({

email,

});


if(existingUser){

return res

.status(400)

.json({

message:

"User already exists",

});

}


/* Create User */

const user =

await User.create({

firstName:

firstName.trim(),

lastName:

lastName.trim(),

email:

email.toLowerCase(),

password,

});


res.status(201).json({

message:

"Registration successful",

user:{

_id:user._id,

firstName:

user.firstName,

lastName:

user.lastName,

email:

user.email,

},

});

}

catch(error){

console.log(

"REGISTER ERROR:",

error

);

res.status(500).json({

message:

error.message,

});

}

}

);


/* =======================
   LOGIN
======================= */

router.post(

"/login",

async(req,res)=>{

try{

const {

email,

password,

} = req.body;


/* Validation */

if(

!email ||

!password

){

return res

.status(400)

.json({

message:

"Please enter email and password",

});

}


const user =

await User.findOne({

email:

email.toLowerCase(),

});


if(!user){

return res

.status(400)

.json({

message:

"Invalid email",

});

}


const isMatch =

await user.matchPassword(

password

);


if(!isMatch){

return res

.status(400)

.json({

message:

"Invalid password",

});

}


const token =

generateToken(

user._id

);


res.status(200).json({

message:

"Login successful",

token,

user:{

_id:

user._id,

firstName:

user.firstName,

lastName:

user.lastName,

email:

user.email,

family:

user.family,

},

});

}

catch(error){

console.log(

"LOGIN ERROR:",

error

);

res.status(500).json({

message:

error.message,

});

}

}

);

module.exports = router;