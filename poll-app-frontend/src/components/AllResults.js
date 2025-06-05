import React, { useEffect, useState } from "react";
import { getAllResults } from "../services/api";

const AllResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getAllResults()
      .then((res) => setResults(res.data))
      .catch((err) => console.error("Failed to fetch results:", err));
  }, []);

  return (
    <div style={styles.container}>
      <style>{`
        .responsive-table-wrapper {
          overflow-x: auto;
        }

        .title-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 24px;
          color: #34495e;
          margin-top: 10px;
          margin-bottom: 20px;
        }

        .score-gif {
          max-height: 40px;
          width: auto;
          border-radius: 4px;
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin-top: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          min-width: 600px;
          border-radius: 10px;
          overflow: hidden;
        }

        th, td {
          padding: 12px 16px;
          text-align: left;
        }

        thead {
          background-color: #2c3e50;
          color: white;
        }

        tbody tr:nth-child(even) {
          background-color: rgb(242, 242, 242);
        }

        tbody tr:hover {
          background-color: #e0e0e0;
        }

        thead th:first-child {
          border-top-left-radius: 10px;
        }

        thead th:last-child {
          border-top-right-radius: 10px;
        }

        tbody tr:last-child td:first-child {
          border-bottom-left-radius: 10px;
        }

        tbody tr:last-child td:last-child {
          border-bottom-right-radius: 10px;
        }

        @media (max-width: 480px) {
          table {
            font-size: 14px;
          }
          th, td {
            padding: 8px 10px;
          }
          .score-gif {
            max-height: 30px;
          }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          table {
            font-size: 15px;
          }
          th, td {
            padding: 10px 14px;
          }
        }

        @media (min-width: 1025px) {
          table {
            font-size: 16px;
          }
        }
      `}</style>

      <h2 className="title-container">
        <span>Scoreboard</span>
        <img
          src="https://i2.wp.com/jonmgomes.com/wp-content/uploads/2020/03/4_Bar_Chart_10_Seconds.gif"
          alt="Scoreboard Animation"
          className="score-gif"
        />
      </h2>

      {results.length === 0 ? (
        <p style={styles.noRecords}>No records found</p>
      ) : (
        <div className="responsive-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Score</th>
                <th>Rank</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => {
                let medal = "";
                if (r.rank === 1) medal = "🥇 ";
                else if (r.rank === 2) medal = "🥈 ";
                else if (r.rank === 3) medal = "🥉 ";

                return (
                  <tr key={i}>
                    <td>{r.userName}</td>
                    <td>{r.emailId}</td>
                    <td>{r.score}</td>
                    <td>
                      {medal}
                      {r.rank}
                    </td>
                    <td
                      style={{
                        color: r.result === "Pass" ? "#2e7d32" : "#c62828",
                        fontWeight: "bold",
                      }}
                    >
                      {r.result}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fdfdfd",
  },
  noRecords: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#888",
    marginTop: "20px",
  },
};

export default AllResults;
