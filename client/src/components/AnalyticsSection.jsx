import {

ResponsiveContainer,

PieChart,

Pie,

Cell,

Tooltip,

Legend,

BarChart,

Bar,

XAxis,

YAxis,

CartesianGrid,

LineChart,

Line,

} from "recharts";

export default function AnalyticsSection({

chartData,

monthlyData,

}) {

const COLORS=[

"#2563eb",

"#7c3aed",

"#f97316",

"#22c55e",

];

return(

<>

<div className="chart-card">

<h2>

Expense Analytics

</h2>

<ResponsiveContainer

width="100%"

height={300}

>

<PieChart>

<Pie

data={chartData}

dataKey="value"

nameKey="name"

>

{chartData.map(

(_,index)=>(

<Cell

key={index}

fill={

COLORS[

index%

COLORS.length

]

}

/>

)

)}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

<div

className="chart-card"

style={{

marginTop:"20px",

}}

>

<h2>

Monthly Expense Trend

</h2>

<ResponsiveContainer

width="100%"

height={300}

>

<LineChart

data={monthlyData}

>

<CartesianGrid/>

<XAxis

dataKey="month"

/>

<YAxis/>

<Tooltip/>

<Line

type="monotone"

dataKey="amount"

/>

</LineChart>

</ResponsiveContainer>

</div>

</>

);

}