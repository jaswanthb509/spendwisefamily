import {
  Wallet,
  Bell,
  Moon,
  Sun,
  LogOut,
  FileDown,
} from "lucide-react";

export default function Navbar({
  activities,
  showNotifications,
  setShowNotifications,
  darkMode,
  setDarkMode,
  logout,
  exportReport,
  currentMember,
}) {
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

        {localStorage
          .getItem("email")
          ?.charAt(0)
          .toUpperCase()}

      </div>

      <div className="profile-info">

        <h4>

          {localStorage.getItem(
            "email"
          )}

        </h4>

        <span>

          {currentMember?.role ===
          "admin"

            ? "Admin"

            : "Member"}

        </span>

      </div>

    </div>

    {/* Notification */}

    <div className="notification-wrapper">

      <button

        className="notification-btn"

        onClick={() =>

          setShowNotifications(

            !showNotifications

          )

        }

      >

        <Bell size={18} />

        {activities.length > 0 && (

          <span
            className="notification-count"
          >

            {activities.length}

          </span>

        )}

      </button>

      {showNotifications && (

        <div
          className="notification-dropdown"
        >

          <h4>
            Notifications
          </h4>

          {activities
            .slice(0, 5)
            .map((activity) => (

              <div

                key={activity._id}

                className="notification-item"

              >

                <p>

                  {activity.action}

                </p>

              </div>

            ))}

        </div>

      )}

    </div>

    {/* Theme */}

    <button

      className="theme-btn"

      onClick={() =>

        setDarkMode(

          !darkMode

        )

      }

    >

      {darkMode ? (

        <Sun size={18} />

      ) : (

        <Moon size={18} />

      )}

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