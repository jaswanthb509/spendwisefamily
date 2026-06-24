const express = require("express");

const router = express.Router();

const Expense = require("../models/Expense");

const User = require("../models/User");

const Family = require("../models/Family");

const Activity = require("../models/Activity");

const protect =
require("../middleware/authMiddleware");


/* ==========================
   GET ALL EXPENSES
========================== */

router.get(

"/",

protect,

async(req,res)=>{

try{

const user=

await User.findById(

req.user._id

);

if(!user.family){

return res.json([]);

}

const expenses=

await Expense.find({

family:user.family,

})

.populate(

"user",

"firstName lastName email"

)

.sort({

createdAt:-1,

});

res.json(

expenses

);

}

catch(error){

console.log(error);

res.status(500).json({

message:

"Failed to load expenses",

});

}

}

);


/* ==========================
   ADD EXPENSE
========================== */

router.post(

"/",

protect,

async(req,res)=>{

try{

const{

title,

amount,

category,

date,

}=req.body;


if(

!title ||

!amount ||

!category

){

return res

.status(400)

.json({

message:

"All fields are required",

});

}


const user=

await User.findById(

req.user._id

);


if(!user.family){

return res

.status(400)

.json({

message:

"Join a family first",

});

}


const expense=

await Expense.create({

user:req.user._id,

family:user.family,

title:title.trim(),

amount:Number(

amount

),

category:

category.trim(),

date,

});


await Activity.create({

family:user.family,

user:req.user._id,

action:

`added expense "${expense.title}" (₹${expense.amount})`,

});


res.status(201).json({

message:

"Expense added successfully",

expense,

});

}

catch(error){

console.log(error);

res.status(500).json({

message:

"Failed to add expense",

});

}

}

);


/* ==========================
   UPDATE EXPENSE
========================== */

router.put(

"/:id",

protect,

async(req,res)=>{

try{

const expense=

await Expense.findById(

req.params.id

);


if(!expense){

return res

.status(404)

.json({

message:

"Expense not found",

});

}


const user=

await User.findById(

req.user._id

);


const family=

await Family.findById(

user.family

);


const currentMember=

family.members.find(

(member)=>

member.user.toString()===

req.user._id.toString()

);


const isAdmin=

currentMember?.role===

"admin";


const isOwner=

expense.user.toString()===

req.user._id.toString();


if(

!isAdmin &&

!isOwner

){

return res

.status(403)

.json({

message:

"Not authorized",

});

}


const{

title,

amount,

category,

}=req.body;


expense.title=

title ??

expense.title;


expense.amount=

amount!==undefined

? Number(

amount

)

: expense.amount;


expense.category=

category ??

expense.category;


const updatedExpense=

await expense.save();


await Activity.create({

family:

expense.family,

user:

req.user._id,

action:

`updated expense "${updatedExpense.title}" (₹${updatedExpense.amount})`,

});


res.json({

message:

"Expense updated successfully",

expense:

updatedExpense,

});

}

catch(error){

console.log(error);

res.status(500).json({

message:

"Update failed",

});

}

}

);


/* ==========================
   DELETE EXPENSE
========================== */

router.delete(

"/:id",

protect,

async(req,res)=>{

try{

const expense=

await Expense.findById(

req.params.id

);


if(!expense){

return res

.status(404)

.json({

message:

"Expense not found",

});

}


const user=

await User.findById(

req.user._id

);


const family=

await Family.findById(

user.family

);


const currentMember=

family.members.find(

(member)=>

member.user.toString()===

req.user._id.toString()

);


const isAdmin=

currentMember?.role===

"admin";


const isOwner=

expense.user.toString()===

req.user._id.toString();


if(

!isAdmin &&

!isOwner

){

return res

.status(403)

.json({

message:

"Not authorized",

});

}


await Activity.create({

family:

expense.family,

user:

req.user._id,

action:

`deleted expense "${expense.title}" (₹${expense.amount})`,

});


await expense.deleteOne();


res.json({

message:

"Expense deleted successfully",

});

}

catch(error){

console.log(error);

res.status(500).json({

message:

"Delete failed",

});

}

}

);


module.exports=router;