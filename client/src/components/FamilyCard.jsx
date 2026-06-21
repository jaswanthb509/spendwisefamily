export default function FamilyCard({

family,

familyMembers=[],

familyName,

setFamilyName,

inviteCode,

setInviteCode,

createFamily,

joinFamily,

}) {

return(

<div className="family-card">

<h2>

Family Group

</h2>

{

!family ? (

<>

<p>

Create a new family or join an existing one.

</p>

<div className="family-actions">

<input

type="text"

placeholder="Family Name"

value={familyName}

onChange={(e)=>

setFamilyName(

e.target.value

)

}

/>

<button

className="main-btn"

onClick={createFamily}

>

Create Family

</button>

</div>

<div className="family-actions">

<input

type="text"

placeholder="Invite Code"

value={inviteCode}

onChange={(e)=>

setInviteCode(

e.target.value

)

}

/>

<button

className="main-btn"

onClick={joinFamily}

>

Join Family

</button>

</div>

</>

)

:

(

<>

<div className="family-info-row">

<div className="info-box">

<span>

Family Name

</span>

<h3>

{family.name}

</h3>

</div>

<div className="info-box">

<span>

Invite Code

</span>

<h3>

{family.inviteCode}

</h3>

</div>

<div className="info-box">

<span>

Members

</span>

<h3>

{familyMembers.length}

</h3>

</div>

</div>

<div className="members-section">

<h3>

Family Members

</h3>

<div className="member-list">

{

familyMembers.map(

(member,index)=>{

const fullName=

member.user

?

`${member.user.firstName || ""}

${member.user.lastName || ""}`

.trim()

:

"Unknown User";

return(

<div

key={index}

className="member-pill"

>

<strong>

{fullName}

</strong>

{" "}

-

{" "}

{

member.role==="admin"

?

"👑 Admin"

:

"👤 Member"

}

</div>

);

}

)

}

</div>

</div>

</>

)

}

</div>

);

}