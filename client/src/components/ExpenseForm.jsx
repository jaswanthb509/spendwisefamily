import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { PlusCircle } from "lucide-react";

export default function ExpenseForm({

  onAdd,

  isGuest,

}) {

const [title,setTitle]=

useState("");

const [amount,setAmount]=

useState("");

const [category,setCategory]=

useState("");

const [date,setDate]=

useState(

new Date()

.toISOString()

.substring(0,10)

);

const [loading,setLoading]=

useState(false);


/* ==========================
   EXPENSE CATEGORIES
========================== */

const categories=[

"Food",

"Transport",

"Bills",

"Shopping",

"Health",

"Education",

"Entertainment",

"Travel",

"Subscriptions",

"Other",

];


/* ==========================
   ADD EXPENSE
========================== */

const handleSubmit=

async(e)=>{

e.preventDefault();


/* Guest Mode */

if(isGuest){

toast.error(

"Please login to save expenses."

);

return;

}


/* Validation */

if(

!title ||

!amount ||

!category ||

!date

){

toast.error(

"Please fill all fields"

);

return;

}

try{

setLoading(true);

const token=

localStorage.getItem(

"token"

);

await axios.post(

"http://localhost:5000/api/expenses",

{

title,

amount:Number(

amount

),

category,

date,

},

{

headers:{

Authorization:

`Bearer ${token}`,

},

}

);


/* Reset Form */

setTitle("");

setAmount("");

setCategory("");

setDate(

new Date()

.toISOString()

.substring(0,10)

);


/* Refresh Dashboard */

if(onAdd){

await onAdd();

}

toast.success(

"Expense added successfully 🎉"

);

}

catch(error){

console.log(error);

toast.error(

"Unable to add expense"

);

}

finally{

setLoading(false);

}

};


/* ==========================
   UI
========================== */

return(

<div className="section-card">

<h2 className="section-title">

<PlusCircle

size={24}

/>

Add Expense

</h2>

<form

className="expense-form-grid"

onSubmit={

handleSubmit

}

>

<input

type="text"

placeholder="Expense Title"

value={title}

onChange={(e)=>

setTitle(

e.target.value

)

}

/>

<input

type="number"

placeholder="Amount"

value={amount}

onChange={(e)=>

setAmount(

e.target.value

)

}

/>

<select

value={category}

onChange={(e)=>

setCategory(

e.target.value

)

}

>

<option value="">

Select Category

</option>

{

categories.map(

(item)=>(

<option

key={item}

value={item}

>

{item}

</option>

)

)

}

</select>

<input

type="date"

value={date}

onChange={(e)=>

setDate(

e.target.value

)

}

/>

<button

className="main-btn"

type="submit"

disabled={loading}

>

{

loading

?

"Adding..."

:

"Add Expense"

}

</button>

</form>

</div>

);

}