import {
 LayoutDashboard,
 Receipt,
 PiggyBank,
 Target,
 Users,
 BarChart3,
 Sparkles,
 History,
} from "lucide-react";

export default function Sidebar({
 activeSection,
 setActiveSection,
}) {

 return (

<aside className="sidebar">

<button
className={
activeSection==="dashboard"
? "active"
: ""
}

onClick={()=>
setActiveSection(
"dashboard"
)}
>

<LayoutDashboard size={18}/>

Dashboard

</button>

<button
className={
activeSection==="expenses"
? "active"
: ""
}

onClick={()=>
setActiveSection(
"expenses"
)}
>

<Receipt size={18}/>

Expenses

</button>

<button
className={
activeSection==="budgets"
? "active"
: ""
}

onClick={()=>
setActiveSection(
"budgets"
)}
>

<PiggyBank size={18}/>

Budgets

</button>

<button
className={
activeSection==="goals"
? "active"
: ""
}

onClick={()=>
setActiveSection(
"goals"
)}
>

<Target size={18}/>

Goals

</button>

<button
className={
activeSection==="family"
? "active"
: ""
}

onClick={()=>
setActiveSection(
"family"
)}
>

<Users size={18}/>

Family

</button>

<button
className={
activeSection==="analytics"
? "active"
: ""
}

onClick={()=>
setActiveSection(
"analytics"
)}
>

<BarChart3 size={18}/>

Analytics

</button>

<button
className={
activeSection==="ai"
? "active"
: ""
}

onClick={()=>
setActiveSection(
"ai"
)}
>

<Sparkles size={18}/>

AI Insights

</button>

<button
className={
activeSection==="activity"
? "active"
: ""
}

onClick={()=>
setActiveSection(
"activity"
)}
>

<History size={18}/>

Activity

</button>

</aside>

);
}