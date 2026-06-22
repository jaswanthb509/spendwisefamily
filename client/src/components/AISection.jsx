export default function AISection({

  getAIAdvice,

  aiAdvice,

  loadingAI,

}) {

return (

<div className="section-card ai-section">

  <div className="section-header">

    <div>

      <h2>

         AI Financial Advisor:

      </h2>

      <p>

        Get personalized financial insights for your family.

      </p>

    </div>

    <button

      className="main-btn"

      onClick={getAIAdvice}

      disabled={loadingAI}

    >

      {

      loadingAI

      ? "Generating..."

      : "Generate Insights"

      }

    </button>

  </div>


  <div className="ai-content">

    {aiAdvice ? (

      <div

        dangerouslySetInnerHTML={{

          __html: aiAdvice

        }}

      />

    ) : (

      <div className="ai-empty">

        <h3>

           No AI Insights Yet

        </h3>

        <p>

          Click the button above to analyze your expenses, budgets and savings goals.

        </p>

      </div>

    )}

  </div>

</div>

);

}