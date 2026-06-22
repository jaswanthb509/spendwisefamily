import {

History,

User,

} from "lucide-react";

export default function ActivitySection({

activities,

}) {

return(

<div className="section-card">

<div className="section-header">

<h2>

<History size={22}/>

Recent Activity:

</h2>

</div>

{

activities.length > 0

? (

<div className="activity-list">

{

activities.map(

(activity)=>{

const fullName =

activity.user

? `${activity.user.firstName || ""}

${activity.user.lastName || ""}`

: "Family Member";

return(

<div

key={activity._id}

className="activity-card"

>

<div className="activity-icon">

<User size={18}/>

</div>

<div className="activity-content">

<h4>

{fullName}

</h4>

<p>

{activity.action}

</p>

<span>

{new Date(

activity.createdAt

).toLocaleString()}

</span>

</div>

</div>

);

}

)

}

</div>

)

: (

<div className="empty-card">

No recent activities..

</div>

)

}

</div>

);

}