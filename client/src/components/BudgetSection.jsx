export default function BudgetSection({

  budgetCategory,

  setBudgetCategory,

  budgetAmount,

  setBudgetAmount,

  createBudget,

  budgets,

  getSpentAmount,

}) {


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

return(

<>


<div className="section-card">

<h2 className="section-title">

Budget Tracking:

</h2>

<div className="expense-form-grid">

<select

value={budgetCategory}

onChange={(e)=>

setBudgetCategory(

e.target.value

)

}

>

<option value="">

Select Category

</option>

{

categories.map(

(category)=>(

<option

key={category}

value={category}

>

{category}

</option>

)

)

}

</select>

<input

type="number"

placeholder="Budget Amount"

value={budgetAmount}

onChange={(e)=>

setBudgetAmount(

e.target.value

)

}

/>

<button

className="main-btn"

onClick={createBudget}

>

Set Budget

</button>

</div>

</div>


<div className="section-card">

<h2 className="section-title">
Budget Overview:

</h2>

{

budgets.length===0

?

(

<div className="empty-card">

No budgets created yet..

</div>

)

:

(

budgets.map(

(budget)=>{

const spent=

getSpentAmount(

budget.category

);

const percentage=

Math.min(

(

spent/

budget.amount

)*100,

100

);

const remaining=

Math.max(

budget.amount-

spent,

0

);

const status=

percentage>=100

? "danger"

: percentage>=80

? "warning"

: "safe";

return(

<div

key={budget._id}

className="budget-card"

>

<div className="budget-header">

<h3>

{budget.category}

</h3>

<span>

₹{budget.amount}

</span>

</div>

<p className="budget-text">

Spent ₹{spent} of ₹{budget.amount}

</p>

<div className="budget-progress">

<div

className={`budget-fill ${status}`}

style={{

width:

`${percentage}%`

}}

></div>

</div>

<div className="budget-footer">

<span>

{percentage.toFixed(0)}%

used

</span>

<span

className={`budget-${status}`}

>

₹{remaining}

<p>(remaining)</p>

</span>

</div>

</div>

);

}

)

)

}

</div>

</>

);

}