import {
  Target,
  PiggyBank,
  Trash2,
  Calendar,
  CheckCircle,
  Pencil,
} from "lucide-react";

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

const formatCurrency=(amount)=>{

return new Intl.NumberFormat(

"en-IN",

{

style:"currency",

currency:"INR",

maximumFractionDigits:0,

}

).format(amount);

};

return(

<>


<div className="section-card">

<h2 className="section-title">

<Target size={22}/>

Savings Goals:

</h2>

<div className="goal-form">

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

</div>

{/* Goal Progress */}

<div className="goal-container">

<h2>

Goal Progress

</h2>

{goals.length===0 ? (

<div className="empty-card">

 No goals created yet

</div>

) : (

goals.map((goal)=>{

const percentage=

Math.min(

(

goal.savedAmount/

goal.targetAmount

)*100,

100

);

const achieved=

goal.savedAmount >=

goal.targetAmount;

const daysLeft=

Math.ceil(

(

new Date(

goal.deadline

)

-

new Date()

)

/(

1000*

60*

60*

24

)

);

return(

<div

key={goal._id}

className="goal-card"

>

<div className="goal-top">

<div>

<h3>

{goal.title}

</h3>

<p>

{formatCurrency(

goal.savedAmount

)}

/

{formatCurrency(

goal.targetAmount

)}

</p>

</div>

<div>

{achieved ? (

<div className="goal-achieved">

<CheckCircle

size={18}

/>

Achieved

</div>

) : (

<div className="goal-days">

<Calendar

size={18}

/>

{daysLeft > 0

? `${daysLeft} days left`

: "Expired"}

</div>

)}

</div>

</div>

<div className="progress-wrapper">

<div

className="progress-bar"

style={{

width:`${percentage}%`,

height:"100%",

backgroundColor:

achieved

? "#22c55e"

: percentage>=70

? "#3b82f6"

: percentage>=40

? "#f59e0b"

: "#ef4444"

}}

>

</div>

</div>

<span className="goal-percentage">

{percentage.toFixed(0)}%

Complete

</span>

{/* Active goals */}

{!achieved &&

daysLeft > 0 && (

<div className="goal-actions">

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

className="main-btn"

onClick={()=>

addSavings(

goal._id,

savingAmounts[goal._id]

)

}

>

<Pencil

size={16}

/>

Save

</button>

<button

className="danger-btn"

onClick={()=>

deleteGoal(

goal._id

)

}

>

<Trash2

size={16}

/>

Delete

</button>

</div>

)}

{/* Achieved */}

{achieved && (

<div

style={{

marginTop:"20px"

}}

>

<button

className="danger-btn"

onClick={()=>

deleteGoal(

goal._id

)

}

>

<Trash2

size={16}

/>

Delete Goal

</button>

</div>

)}

{/* Expired */}

{!achieved &&

daysLeft <=0 && (

<div

style={{

marginTop:"20px"

}}

>

<button

className="danger-btn"

onClick={()=>

deleteGoal(

goal._id

)

}

>

<Trash2

size={16}

/>

Delete Goal

</button>

</div>

)}

</div>

);

})

)}

</div>

</>

);

}