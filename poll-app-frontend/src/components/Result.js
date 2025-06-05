import React from "react";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const result = JSON.parse(localStorage.getItem("result") || "{}");
  const hasResult = result && Object.keys(result).length > 0;
  const navigate = useNavigate();

  const goToAllResults = () => {
    navigate("/results");
  };

  return (
    <div style={styles.container}>
      <style>{`
        .result-card {
          background-color: #f9f9f9;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          margin: 0 auto;
          width: 90%;
          max-width: 400px;
        }

        .result-card h2 {
          color: #2c3e50;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .result-card p {
          font-size: 18px;
          color: #34495e;
          margin: 10px 0;
        }

        .no-result {
          color: #e74c3c;
          font-size: 18px;
          text-align: center;
        }

        .view-all-btn {
          margin-top: 20px;
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        .view-all-btn:hover {
          background-color: #2980b9;
        }

        @media (max-width: 480px) {
          .result-card {
            padding: 20px;
          }
          .result-card h2 {
            font-size: 20px;
          }
          .result-card p {
            font-size: 16px;
          }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .result-card {
            padding: 25px;
          }
          .result-card h2 {
            font-size: 22px;
          }
        }

        @media (min-width: 1025px) {
          .result-card {
            max-width: 500px;
          }
        }
      `}</style>

      {hasResult ? (
        <div className="result-card">
          <img
            src="https://i.pinimg.com/originals/d3/c6/8a/d3c68aeb6f9ead3e57f80f12d12304b8.gif"
            alt="Celebration"
            style={{
              width: "120px",
              height: "120px",
              margin: "0 auto 20px auto",
              display: "block",
            }}
          />

          <h2>Your Result</h2>
          <p>
            Score: <strong>{result.score}</strong>
          </p>
          <p>
            Rank: <strong>{result.rank}</strong>
          </p>
          <button className="view-all-btn" onClick={goToAllResults}>
            View All Scores
          </button>
        </div>
      ) : (
        <p className="no-result">
          No result found. Please complete the quiz first.
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "40px 20px 20px 20px",
    minHeight: "100vh",
    backgroundColor: "#ecf0f1",
  },
};

export default Result;
