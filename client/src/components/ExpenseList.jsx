import { useState } from "react";

import {
  Pencil,
  Trash2,
  Save,
  X,
  Search,
} from "lucide-react";

export default function ExpenseList({

  expenses = [],

  deleteExpense,

  updateExpense,

  currentMember,

  isGuest,

}) {

  console.log("isGuest:", isGuest);

console.log("currentMember:", currentMember);

console.log("role:", currentMember?.role);

  const [filter, setFilter] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editTitle, setEditTitle] = useState("");

  const [editAmount, setEditAmount] = useState("");

  const [editCategory, setEditCategory] = useState("");

  const categories = [

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


  const canModifyExpense = (expense) => {

    if (isGuest) {

      return false;

    }

    if (currentMember?.role === "admin") {

      return true;

    }

    return (

      expense.user?._id?.toString() ===

      currentMember?._id?.toString()

    );

  };


  const startEdit = (expense) => {

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


  const cancelEdit = () => {

    setEditingId(

      null

    );

  };


  const saveEdit = () => {

    updateExpense(

      editingId,

      {

        title: editTitle,

        amount: Number(

          editAmount

        ),

        category:

          editCategory,

      }

    );

    setEditingId(

      null

    );

  };


  const filteredExpenses =

    expenses.filter(

      (expense) =>

        expense.category

          ?.toLowerCase()

          .includes(

            filter.toLowerCase()

          )

    );


  return (

<div className="section-card">

<h2 className="section-title">

Expense History

</h2>


<div className="expense-filters">

<div className="search-box">

<Search size={18} />

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

filteredExpenses.length === 0

? (

<div className="empty-state">

<h3>

No expenses found

</h3>

</div>

)

: (

filteredExpenses.map(

(expense)=>(

<div

key={expense._id}

className="expense-card"

>

{

editingId===

expense._id

? (

<>

<div className="edit-grid">

<input

value={editTitle}

onChange={(e)=>

setEditTitle(

e.target.value

)

}

/>

<input

type="number"

value={editAmount}

onChange={(e)=>

setEditAmount(

e.target.value

)

}

/>

<select

value={editCategory}

onChange={(e)=>

setEditCategory(

e.target.value

)

}

>

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

</div>


<div className="expense-actions">

<button

className="main-btn"

onClick={saveEdit}

>

<Save size={16}/>

Save

</button>


<button

className="danger-btn"

onClick={cancelEdit}

>

<X size={16}/>

Cancel

</button>

</div>

</>

)

: (

<>

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

</>

)

}

</div>

)

)

)

}

</div>

</div>

);

}