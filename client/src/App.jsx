import {

useState,

useEffect,

} from "react";

import "./App.css";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

function App(){

const [

page,

setPage

] = useState(

localStorage.getItem(

"token"

)

? "dashboard"

: "home"

);

const [

darkMode,

setDarkMode

] = useState(

localStorage.getItem(

"theme"

)==="dark"

);

useEffect(()=>{

document.body.className=

darkMode

? "dark-theme"

: "";

localStorage.setItem(

"theme",

darkMode

? "dark"

: "light"

);

},[darkMode]);

const handleLogout=()=>{

localStorage.clear();

setPage("home");

};

return(

<div

className={`app ${

darkMode

? "dark-theme"

: ""

}`}

>

{/* Home */}

{

page==="home" && (

<div className="home-page">

{/* Navbar */}

<nav className="navbar">

<h2 className="logo">

SpendWiseFamily

</h2>

<div className="nav-actions">

<button

className="nav-btn"

onClick={()=>

setPage("login")

}

>

Login

</button>

<button

className="primary-btn"

onClick={()=>

setPage(

"register"

)

}

>

Sign Up

</button>

</div>

</nav>

{/* Hero */}

<section className="hero">

<div className="hero-ai">

🚀 AI Powered Family Finance Tracker

</div>

<h1>

Manage Family

Expenses Smarter

</h1>

<p className="hero-para">

Track spending,

save smarter

and grow together.

</p>

<div className="hero-buttons">

<button

className="primary-btn"

onClick={()=>

setPage(

"register"

)

}

>

🚀 Start Free

</button>

</div>

</section>

{/* Features */}

<section className="features">

<div className="card">

<h3>

1. Expense Tracking

</h3>

<p>

Track all expenses.

</p>

</div>

<div className="card">

<h3>

2. Smart Analytics

</h3>

<p>

Visual spending charts.

</p>

</div>

<div className="card">

<h3>

3. Savings Goals

</h3>

<p>

Track goals together.

</p>

</div>

<div className="card">

<h3>

4. AI Insights

</h3>

<p>

Get smart recommendations.

</p>

</div>

</section>

{/* CTA */}

<section

style={{

textAlign:"center",

marginTop:"80px",

}}

>

<h2>

Ready To Take

Control Of

Your Finances?

</h2>

<br/>

<button

className="primary-btn"

onClick={()=>

setPage(

"register"

)

}

>

Get Started

</button>

</section>

{/* Footer */}

<footer className="footer">

<h2>

SpendWiseFamily

</h2>

<p>

Expense Tracking •

Savings Goals •

AI Insights

</p>

<p>

© 2026

SpendWiseFamily

</p>

</footer>

</div>

)

}

{/* Login */}

{

page==="login" && (

<Login

goToRegister={()=>

setPage(

"register"

)

}

goToDashboard={()=>

setPage(

"dashboard"

)

}

/>

)

}

{/* Register */}

{

page==="register" && (

<Register

goToLogin={()=>

setPage(

"login"

)

}

/>

)

}

{/* Dashboard */}

{

page==="dashboard" && (

<Dashboard

goHome={

handleLogout

}

darkMode={

darkMode

}

setDarkMode={

setDarkMode

}

/>

)

}

</div>

);

}

export default App;