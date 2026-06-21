import { useState } from "react";

import {

Pencil,

Trash2,

Save,

X,

Search,

} from "lucide-react";

export default function ExpenseList({

expenses=[],

deleteExpense,

updateExpense,

currentMember,

isGuest,

}){

const [filter,setFilter]=

useState("");

const [editingId,setEditingId]=

useState(null);

const [editTitle,setEditTitle]=

useState("");

const [editAmount,setEditAmount]=

useState("");

const [editCategory,setEditCategory]=

useState("");


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


const canModifyExpense=(expense)=>{

if(isGuest){

return false;

}

if(currentMember?.role==="admin"){

return true;

}

const owner=

expense.user?._id ||

expense.user;

return(

owner===

currentMember?._id

);

};


const startEdit=(expense)=>{

setEditingId(

expense._id

);

setEditTitle(

expense.title

);

setEditAmount(

expense.amount

);

setEditCategory(

expense.category

);

};


const saveEdit=()=>{

updateExpense(

editingId,

{

title:editTitle,

amount:Number(

editAmount

),

category:

editCategory,

}

);

setEditingId(null);

};


const filteredExpenses=

expenses.filter(

(expense)=>

expense.category

?.toLowerCase()

.includes(

filter

.toLowerCase()

)

);


return(

<div className="section-card">

<h2>

Expense History

</h2>


<div className="expense-filters">

<div className="search-box">

<Search size={18}/>

<input

type="text"

placeholder="Filter category"

value={filter}

onChange={(e)=>

setFilter(

e.target.value

)

}

/>

</div>

</div>


<div className="expense-list">

{

filteredExpenses.map(

(expense)=>(

<div

key={expense._id}

className="expense-card"

>

<div className="expense-info">

<h3>

{expense.title}

</h3>

<p>

₹{

Number(

expense.amount

).toLocaleString()

}

</p>

<span>

{expense.category}

</span>

</div>


{

canModifyExpense(

expense

) && (

<div className="expense-actions">

<button

className="main-btn"

onClick={()=>

startEdit(

expense

)

}

>

<Pencil size={16}/>

Edit

</button>


<button

className="danger-btn"

onClick={()=>

deleteExpense(

expense._id

)

}

>

<Trash2 size={16}/>

Delete

</button>

</div>

)

}

</div>

)

)

}

</div>

</div>

);

}