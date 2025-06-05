import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import rocketGif from "../assests/rocket.gif";
import { fetchQuestions, submitAnswers } from "../services/api";

const Registration = () => {
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [answers, setAnswers] = useState({});
  const [showQuestions, setShowQuestions] = useState(false);
  const [missingQuestions, setMissingQuestions] = useState([]);
  const navigate = useNavigate();

  const questionRefs = useRef({});

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);

  const startQuiz = () => {
    if (!name.trim()) return toast.error("Name is required!");
    if (!isValidName(name))
      return toast.error("Name should contain only alphabets!");
    if (!email.trim()) return toast.error("Email id is required!");
    if (!isValidEmail(email)) return toast.error("Please enter a valid email!");

    fetchQuestions()
      .then((res) => {
        setQuestions(res.data);
        setUserDetails({ name, email });
        setName("");
        setEmail("");
        setShowQuestions(true);
        setMissingQuestions([]);
        toast.success("Quiz started! Good luck!");
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        toast.error("Unable to fetch questions. Please try again later.");
      });
  };

  const handleSubmit = () => {
    const unanswered = questions.filter((q) => !answers[q.id]).map((q) => q.id);

    if (unanswered.length > 0) {
      setMissingQuestions(unanswered);
      toast.warning(
        `Please answer all questions! ${unanswered.length} question(s) left.`
      );
      const firstUnansweredId = unanswered[0];
      const element = questionRefs.current[firstUnansweredId];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const payload = {
      userName: userDetails.name,
      emailId: userDetails.email,
      answers,
    };

    submitAnswers(payload)
      .then((res) => {
        localStorage.setItem("result", JSON.stringify(res.data));
        toast.success("Quiz submitted successfully! 🎊");
        navigate("/result");
      })
      .catch((err) => {
        console.error("Submission error:", err);
        toast.error(err.response?.data?.error || "An error occurred");
      });
  };

  return (
    <div style={styles.page}>
      <style>{`
        * { box-sizing: border-box; }

        input[type="text"], input[type="email"] {
          padding: 10px;
          margin-bottom: 12px;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
        }

        input[type="radio"] {
          margin-right: 8px;
        }

        button {
          background-color: #3498db;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 15px;
          width: auto;
          font-size: 16px;
        }

        button:hover {
          background-color: #2980b9;
        }

        label {
          font-size: 15px;
        }

        @media (max-width: 600px) {
          .container {
            width: 90% !important;
            padding: 20px;
          }

          h2 {
            font-size: 22px;
          }
        }

        @media (min-width: 601px) {
          .container.registration {
            width: 100%;
            max-width: 400px;
          }

          .container.questions {
            width: 100%;
            max-width: 1000px;
          }
        }
      `}</style>

      <div
        className={`container ${showQuestions ? "questions" : "registration"}`}
        style={{
          ...styles.container,
          ...(showQuestions
            ? styles.questionContainer
            : styles.registrationContainer),
        }}
      >
        {!showQuestions && (
          <img
            src={rocketGif}
            alt="Rocket Animation"
            style={styles.rocketImage}
          />
        )}
        <h2 style={styles.title}>
          {showQuestions ? "Questionnaire" : "Quiz Registration"}
        </h2>

        {!showQuestions ? (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={styles.buttonContainer}>
              <button onClick={startQuiz}>Start Quiz</button>
            </div>
          </>
        ) : (
          <>
            {questions.map((q, idx) => {
              const isMissing = missingQuestions.includes(q.id);
              return (
                <div
                  key={q.id}
                  ref={(el) => (questionRefs.current[q.id] = el)}
                  style={{
                    ...styles.questionBlock,
                    ...(isMissing ? styles.missingQuestion : {}),
                  }}
                  onClick={() => {
                    if (isMissing) {
                      questionRefs.current[q.id]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                      setMissingQuestions((prev) =>
                        prev.filter((id) => id !== q.id)
                      );
                    }
                  }}
                >
                  <div style={styles.progressText}>
                    Question {idx + 1} of {questions.length}
                  </div>
                  <h4 style={styles.questionText}>{q.text}</h4>
                  {q.options.map((o) => (
                    <label
                      key={o.id}
                      style={{
                        ...styles.optionLabel,
                        ...(answers[q.id] === o.id
                          ? styles.selectedOption
                          : {}),
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={o.id}
                        checked={answers[q.id] === o.id}
                        onChange={() =>
                          setAnswers({ ...answers, [q.id]: o.id })
                        }
                        style={styles.radioButton}
                      />
                      {o.text}
                    </label>
                  ))}
                </div>
              );
            })}
            <div style={styles.buttonContainer}>
              <button onClick={handleSubmit}>Submit Answers</button>
            </div>
          </>
        )}
      </div>

      <ToastContainer
        autoClose={3000}
        position="top-right"
        closeButton={false}
      />
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "#ecf0f1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  registrationContainer: {
    padding: "30px",
  },
  questionContainer: {
    padding: "30px",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "25px",
  },
  questionBlock: {
    marginBottom: "25px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  missingQuestion: {
    border: "2px solid #e74c3c",
    backgroundColor: "#fff0f0",
    cursor: "pointer",
  },
  questionText: {
    marginBottom: "12px",
    fontWeight: "600",
    fontSize: "17px",
    color: "#2c3e50",
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "15px",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  selectedOption: {
    backgroundColor: "#e8f5e9", // light green background
    fontWeight: "bold",
  },
  radioButton: {
    marginRight: "10px",
    cursor: "pointer",
  },
  rocketImage: {
    width: "80px",
    display: "block",
    margin: "0 auto 20px auto",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  },
  progressText: {
    fontSize: "14px",
    fontStyle: "italic",
    color: "#888",
    marginBottom: "8px",
  },
};

export default Registration;
