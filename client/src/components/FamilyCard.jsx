export default function FamilyCard({

  family,

  familyMembers,

  familyName,

  setFamilyName,

  inviteCode,

  setInviteCode,

  createFamily,

  joinFamily,

}) {

return (

<div className="family-card">

{!family ? (

<>

<h2>

Family Group

</h2>

<p>

Create a family or join one.

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

) : (

<>

<h2>

Family Group

</h2>

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

Members

</h3>

<div className="member-list">

{familyMembers.map(

(member,index)=>(

<div

key={index}

className="member-pill"

>

{member.role==="admin"

? "(Admin)"

: "(Member)"}

{" "}

{member.user?.email}

</div>

)

)}

</div>

</div>

</>

)}

</div>

);

}