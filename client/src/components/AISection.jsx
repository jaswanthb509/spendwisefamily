export default function AISection({

getAIAdvice,

aiAdvice,

loadingAI,

}) {

return (

<div
className="stat-card"
>

<h2>

AI Insights

</h2>

<button

className="main-btn"

onClick={
getAIAdvice
}

disabled={
loadingAI
}

>

{loadingAI

? "Generating..."

: "Ask Gemini"

}

</button>

<div

style={{

background:"#eff6ff",

padding:"20px",

borderRadius:
"12px",

marginTop:
"15px",

whiteSpace:
"pre-wrap",

}}

>

{aiAdvice ||

"Generate AI financial insights"}

</div>

</div>

);

}