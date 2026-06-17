import {

  Wallet,

  Bell,

  Moon,

  Sun,

  LogOut,

  FileDown,

  Crown,

  User,

} from "lucide-react";

export default function Navbar({

  activities = [],

  showNotifications,

  setShowNotifications,

  darkMode,

  setDarkMode,

  logout,

  exportReport,

  currentMember,

}) {

  /* ======================
     USER INFO
  ====================== */

  const firstName =

    localStorage.getItem(

      "firstName"

    ) || "";

  const lastName =

    localStorage.getItem(

      "lastName"

    ) || "";

  const fullName =

    `${firstName} ${lastName}`

      .trim() ||

    "Guest User";

  const avatarLetter =

    firstName

    ? firstName

      .charAt(0)

      .toUpperCase()

    : "G";

  /* ======================
     THEME
  ====================== */

  const toggleTheme = () => {

    const newTheme =

      !darkMode;

    setDarkMode(

      newTheme

    );

    localStorage.setItem(

      "theme",

      newTheme

      ? "dark"

      : "light"

    );

  };

  return (

<nav className="dash-nav">

{/* Left */}

<div className="logo-section">

<Wallet size={28} />

<h2 className="dash-logo">

SpendWiseFamily

</h2>

</div>

{/* Right */}

<div className="nav-right">

{/* Profile */}

<div className="profile-card">

<div className="profile-avatar">

{avatarLetter}

</div>

<div className="profile-info">

<h4>

{fullName}

</h4>

<span>

{

currentMember?.role ===

"admin"

? (

<>

<Crown size={14} />

Admin

</>

)

: (

<>

<User size={14} />

Member

</>

)

}

</span>

</div>

</div>

{/* Notifications */}

<div className="notification-wrapper">

<button

className="notification-btn"

onClick={()=>

setShowNotifications(

!showNotifications

)

}

>

<Bell size={18} />

{

activities.length > 0 && (

<span

className="notification-count"

>

{activities.length}

</span>

)

}

</button>

{

showNotifications && (

<div

className="notification-dropdown"

>

<h4>

Notifications

</h4>

{

activities.length === 0

? (

<p>

No notifications

</p>

)

: (

activities

.slice(0,5)

.map(

(activity)=>(

<div

key={activity._id}

className="notification-item"

>

<p>

{activity.action}

</p>

<small>

{

new Date(

activity.createdAt

)

.toLocaleString()

}

</small>

</div>

)

)

)

}

</div>

)

}

</div>

{/* Theme */}

<button

className="theme-btn"

onClick={toggleTheme}

>

{

darkMode

? (

<Sun size={18} />

)

: (

<Moon size={18} />

)

}

</button>

{/* Export */}

<button

className="export-btn"

onClick={exportReport}

>

<FileDown size={18} />

Export

</button>

{/* Logout */}

<button

className="logout-btn"

onClick={logout}

>

<LogOut size={18} />

Logout

</button>

</div>

</nav>

);

}