function Home() {
  return (
    <div className="home">

      <nav className="navbar">
        <h2 className="logo">
          SpendWiseFamily
        </h2>

        <button className="nav-btn">
          Login
        </button>
      </nav>

      <section className="hero">

        <div className="hero-badge">
          🚀 AI Powered Family Finance Tracker
        </div>

        <h1>
          Manage Family Money Smarter
        </h1>

        <p>
          Track household expenses,
          achieve savings goals,
          and grow together financially.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Get Started
          </button>

          <button className="secondary-btn">
            Live Demo
          </button>
        </div>

      </section>

      <section className="features">

        <h2>
          Why SpendWiseFamily?
        </h2>

        <div className="cards">

          <div className="card">
            <h3>
              💸 Track Every Expense
            </h3>

            <p>
              Monitor spending by
              each family member.
            </p>
          </div>

          <div className="card">
            <h3>
              🎯 Shared Savings Goals
            </h3>

            <p>
              Work together to buy
              what matters most.
            </p>
          </div>

          <div className="card">
            <h3>
              🤖 Smart Insights
            </h3>

            <p>
              Understand where
              money can be saved.
            </p>
          </div>

        </div>

      </section>

      <section className="landing-stats">

        <div>
          <h2>500+</h2>
          <p>Expenses Managed</p>
        </div>

        <div>
          <h2>50+</h2>
          <p>Families Joined</p>
        </div>

        <div>
          <h2>₹1L+</h2>
          <p>Tracked Spending</p>
        </div>

      </section>

      <footer className="footer">

        <h2>
          SpendWiseFamily
        </h2>

        <p>
          Built using MERN Stack
        </p>

        <p>
          Expense Tracking •
          Savings Goals •
          Budget Management •
          AI Insights
        </p>

      </footer>

    </div>
  );
}

export default Home;