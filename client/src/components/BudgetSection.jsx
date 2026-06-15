export default function BudgetSection({

  budgetCategory,

  setBudgetCategory,

  budgetAmount,

  setBudgetAmount,

  createBudget,

  budgets,

  getSpentAmount,

}) {

return (

<>

<div
  className="stat-card"
  style={{
    marginTop: "20px",
  }}
>

  <h2>
    Budget Tracking
  </h2>

  <select

    value={budgetCategory}

    onChange={(e)=>

      setBudgetCategory(

        e.target.value

      )

    }

  >

    <option value="">
      Category
    </option>

    <option value="Food">
      Food
    </option>

    <option value="Bills">
      Bills
    </option>

    <option value="Travel">
      Travel
    </option>

    <option value="Shopping">
      Shopping
    </option>

  </select>

  <input

    type="number"

    placeholder="
    Budget Amount"

    value={budgetAmount}

    onChange={(e)=>

      setBudgetAmount(

        e.target.value

      )

    }

  />

  <button

    className="main-btn"

    onClick={
      createBudget
    }

  >

    Set Budget

  </button>

</div>


<div
  className="stat-card"
  style={{
    marginTop: "20px",
  }}
>

<h2>

Budget List

</h2>

{budgets.map(
(budget)=>{

const spent =
getSpentAmount(
budget.category
);

const percentage =
Math.min(
(spent /
budget.amount)
*100,
100
);

return (

<div

key={budget._id}

style={{

marginBottom:
"20px",

}}

>

<h4>

{budget.category}

</h4>

<p>

₹{spent}

/

₹{budget.amount}

</p>

<div

style={{

height:"12px",

background:"#ddd",

borderRadius:
"20px",

}}

>

<div

style={{

width:
`${percentage}%`,

height:
"100%",

background:

percentage>80

? "#ef4444"

: "#22c55e",

borderRadius:
"20px",

}}

></div>

</div>

<small>

Remaining ₹

{budget.amount-spent}

</small>

</div>

);

}

)}

</div>

</>

);

}