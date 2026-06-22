import { useState } from "react";

import "../App.css";

function Login({

goToRegister,

goToDashboard,

}) {

const [

email,

setEmail

] = useState("");

const [

password,

setPassword

] = useState("");

const [

loading,

setLoading

] = useState(false);


const handleLogin = async () => {

if(

!email ||

!password

){

alert(

"Please fill all fields"

);

return;

}

try{

setLoading(true);

const res = await fetch(

"http://localhost:5000/api/auth/login",

{

method:"POST",

headers:{

"Content-Type":

"application/json",

},

body:JSON.stringify({

email,

password,

}),

}

);

const data =

await res.json();

if(

res.ok &&

data.token

){

localStorage.setItem(

"token",

data.token

);

localStorage.removeItem(

"guestMode"

);

localStorage.setItem(

"userId",

data.user._id

);

localStorage.setItem(

"firstName",

data.user.firstName

);

localStorage.setItem(

"lastName",

data.user.lastName

);

localStorage.setItem(

"email",

data.user.email

);

if(

data.user.family

){

localStorage.setItem(

"family",

data.user.family

);

}

goToDashboard();

}

else{

alert(

data.message ||

"Login failed"

);

}

}

catch(error){

console.log(

error

);

alert(

"Something went wrong"

);

}

finally{

setLoading(false);

}

};


return(

<div className="auth-page">

<div className="auth-box">

<h2>

Welcome Back 

</h2>

<p className="auth-subtitle">

Manage expenses, savings and family finances in one place.

</p>

<input

type="email"

placeholder="Email Address"

value={email}

onChange={(e)=>

setEmail(

e.target.value

)

}

/>

<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>

setPassword(

e.target.value

)

}

/>

<button

className="primary-btn auth-btn"

onClick={handleLogin}

disabled={loading}

>

{

loading

? "Logging in..."

: "Login"

}

</button>

<p className="switch-text">

Don't have an account?

<span

className="link-text"

onClick={goToRegister}

>

Register

</span>

</p>

</div>

</div>

);

}

export default Login;