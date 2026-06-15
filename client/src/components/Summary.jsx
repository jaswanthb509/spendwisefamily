import {
  PlusCircle,
  Target,
  Users,
  FileDown,
} from "lucide-react";

export default function Summary({

  total,

  familyMembers,

  goals,

  healthScore,

  formatCurrency,

  exportReport,

  setActiveSection,

}) {

return (

<>

<div className="dash-header">

  <div className="welcome-card">

    <div className="welcome-top">

      <div>

        <h1>

          Welcome Back

        </h1>

        <p>

          Manage expenses,

          budgets, savings goals

          and family finances

          in one place.

        </p>

      </div>

      <div
        className="welcome-badge"
      >

        A Smart Finance Tracker

      </div>

    </div>

    <div className="welcome-stats">

      <div
        className="welcome-stat-card"
      >

        <h3>

          {formatCurrency(
            total
          )}

        </h3>

        <span>

          Total Expenses

        </span>

      </div>

      <div
        className="welcome-stat-card"
      >

        <h3>

          {
            familyMembers.length
          }

        </h3>

        <span>

          Family Members

        </span>

      </div>

      <div
        className="welcome-stat-card"
      >

        <h3>

          {goals.length}

        </h3>

        <span>

          Active Goals

        </span>

      </div>

      <div
        className="health-card"
      >

        <h3

          style={{

            color:

              healthScore >= 8

                ? "#22c55e"

                : healthScore >= 6

                ? "#f59e0b"

                : "#ef4444",

          }}

        >

          {healthScore}/10

        </h3>

        <span>

          Financial Health

        </span>

      </div>

    </div>

  </div>

</div>

<div className="quick-actions">

  <div

    className="action-card"

    onClick={() =>

      setActiveSection(

        "expenses"

      )

    }

  >

    <PlusCircle
      size={34}
    />

    <h4>

      Add Expense

    </h4>

    <p>

      Record a new expense

    </p>

  </div>

  <div

    className="action-card"

    onClick={() =>

      setActiveSection(

        "goals"

      )

    }

  >

    <Target
      size={34}
    />

    <h4>

      Create Goal

    </h4>

    <p>

      Track savings

    </p>

  </div>

  <div

    className="action-card"

    onClick={() =>

      setActiveSection(

        "family"

      )

    }

  >

    <Users
      size={34}
    />

    <h4>

      Family Group

    </h4>

    <p>

      Manage members

    </p>

  </div>

  <div

    className="action-card"

    onClick={
      exportReport
    }

  >

    <FileDown
      size={34}
    />

    <h4>

      Export PDF

    </h4>

    <p>

      Download report

    </p>

  </div>

</div>

</>

);

}