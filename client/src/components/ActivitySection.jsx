export default function ActivitySection({

activities,

}) {

return (

<div
className="stat-card"
>

<h2>

Recent Activity

</h2>

{activities.length>0 ? (

activities.map(

(activity)=>(

<div

key={
activity._id
}

className="
activity-card"

>

<div
className="
activity-content"

>

<h4>

{activity.user?.email ||

"Family Member"}

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

)

)

) : (

<p>

No activities

found

</p>

)}

</div>

);

}