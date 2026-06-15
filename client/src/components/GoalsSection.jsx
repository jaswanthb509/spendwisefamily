export default function GoalsSection({

  goals,

  goalTitle,

  setGoalTitle,

  goalAmount,

  setGoalAmount,

  goalDeadline,

  setGoalDeadline,

  createGoal,

  addSavings,

  deleteGoal,

  savingAmounts,

  setSavingAmounts,

}) {

return (

<>

{/* Create Goal */}

<div className="stat-card">

<h2>

Savings Goals

</h2>

<input

type="text"

placeholder="Goal Title"

value={goalTitle}

onChange={(e)=>

setGoalTitle(

e.target.value

)

}

/>

<input

type="number"

placeholder="Target Amount"

value={goalAmount}

onChange={(e)=>

setGoalAmount(

e.target.value

)

}

/>

<input

type="date"

value={goalDeadline}

onChange={(e)=>

setGoalDeadline(

e.target.value

)

}

/>

<button

className="main-btn"

onClick={createGoal}

>

Create Goal

</button>

</div>

{/* Goal Progress */}

<div style={{marginTop:"20px"}}>

<h2>

Goal Progress

</h2>

{goals.map((goal)=>{

const percentage=Math.min(

(goal.savedAmount/

goal.targetAmount)

*100,

100

);

return(

<div

key={goal._id}

className="goal-card"

>

<h3>

{goal.title}

</h3>

<p>

₹{goal.savedAmount}

/

₹{goal.targetAmount}

</p>

<div

style={{

height:"12px",

background:"#ddd",

borderRadius:"20px",

}}

>

<div

style={{

width:`${percentage}%`,

height:"100%",

background:"#2563eb",

borderRadius:"20px",

}}

></div>

</div>

<small>

{percentage.toFixed(0)}%

Complete

</small>

<div

style={{

display:"flex",

gap:"10px",

marginTop:"10px",

}}

>

<input

type="number"

placeholder="Add Savings"

value={

savingAmounts[goal._id]

||

""

}

onChange={(e)=>

setSavingAmounts({

...savingAmounts,

[goal._id]:

e.target.value,

})

}

/>

<button

onClick={()=>

addSavings(

goal._id,

savingAmounts[goal._id]

)

}

>

Add

</button>

<button

onClick={()=>

deleteGoal(

goal._id

)

}

>

Delete

</button>

</div>

</div>

);

})}

</div>

</>

);

}