import {

  PlusCircle,

  Target,

  Users,

  FileDown,

} from "lucide-react";

export default function Summary({

  total,

  familyMembers,

  goals,

  healthScore,

  formatCurrency,

  exportReport,

  setActiveSection,

}) {

  return (

<>


<div className="dash-header">

<div className="welcome-card">

<div className="welcome-top">

<div>

<h1>

Welcome Back..

</h1>

<p>

Manage expenses, budgets,

family members and savings

goals in one place.

</p>

</div>


</div>



<div className="welcome-stats">

<div className="welcome-stat-card">

<h3>

{formatCurrency(total)}

</h3>

<span>

Total Expenses

</span>

</div>

<div className="welcome-stat-card">

<h3>

{familyMembers.length}

</h3>

<span>

Family Members

</span>

</div>

<div className="welcome-stat-card">

<h3>

{goals.length}

</h3>

<span>

Savings Goals

</span>

</div>

<div className="health-card">

<h3

style={{

color:

healthScore >= 8

? "#22c55e"

: healthScore >= 6

? "#f59e0b"

: "#ef4444",

}}

>

{healthScore}/10

</h3>

<span>

Financial Health

</span>

</div>

</div>

</div>

</div>


<div className="quick-actions">

<div

className="action-card"

onClick={()=>

setActiveSection(

"expenses"

)

}

>

<PlusCircle size={34} />

<h4>

Add Expense

</h4>

<p>

Track a new expense

</p>

</div>

<div

className="action-card"

onClick={()=>

setActiveSection(

"goals"

)

}

>

<Target size={34} />

<h4>

Savings Goals

</h4>

<p>

Create savings targets

</p>

</div>

<div

className="action-card"

onClick={()=>

setActiveSection(

"family"

)

}

>

<Users size={34} />

<h4>

Family Group

</h4>

<p>

Manage family members

</p>

</div>

<div

className="action-card"

onClick={exportReport}

>

<FileDown size={34} />

<h4>

Export Report

</h4>

<p>

Download PDF report

</p>

</div>

</div>

</>

);

}