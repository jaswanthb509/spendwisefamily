import { useState } from "react";

import {

  Pencil,

  Trash2,

  Save,

  X,

} from "lucide-react";

export default function ExpenseList({

  expenses,

  deleteExpense,

  updateExpense,

}) {

  const [

    filter,

    setFilter,

  ] = useState("");

  const [

    editingId,

    setEditingId,

  ] = useState(null);

  const [

    editTitle,

    setEditTitle,

  ] = useState("");

  const [

    editAmount,

    setEditAmount,

  ] = useState("");

  const [

    editCategory,

    setEditCategory,

  ] = useState("");

  const startEdit = (

    expense

  ) => {

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

  const saveEdit = () => {

    updateExpense(

      editingId,

      {

        title:

          editTitle,

        amount:

          editAmount,

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

            filter

              .toLowerCase()

          )

    );

  return (

<div className="section-card">

<h2>

Expense History

</h2>

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

<div className="expense-list">

{filteredExpenses.map(

(expense)=>(

<div

key={expense._id}

className="expense-card"

>

{editingId===

expense._id ? (

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

<option>

Food

</option>

<option>

Bills

</option>

<option>

Shopping

</option>

<option>

Travel

</option>

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

onClick={()=>

setEditingId(

null

)

}

>

<X size={16}/>

Cancel

</button>

</div>

</>

) : (

<>

<div>

<h3>

{expense.title}

</h3>

<p>

₹{expense.amount}

</p>

<span>

{expense.category}

</span>

</div>

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

</>

)}

</div>

)

)}

</div>

</div>

);

}