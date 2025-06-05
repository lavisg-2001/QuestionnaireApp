# QuestionnaireApp

A full-stack **Quiz Application** built with **Spring Boot**, **MySQL**, and **React**. Users can register, answer, view their scores and browse a leaderboard.

## Features

- **User  Registration**: Users can register with their name and email.
- **Mandatory Questionnaire**: All questions must be answered to submit.
- **Automatic Scoring & Ranking**: Scores are calculated, and ranks are assigned based on performance.
- **Result Page**: Displays user scores and ranks.
- **Scoreboard**: Shows all users' scores, ranks, and pass/fail status.
- **Responsive Design**: Adapts to mobile, tablet, and desktop views.

## Technology Stack

- **Frontend**: React, Axios, React Router, React Toastify
- **Backend**: Java 17, Spring Boot, Spring Data JPA
- **Database**: MySQL
- **Build Tool**: Maven, npm

## API Endpoints

- **GET** `poll/questions`: Retrieve all questions.
- **POST** `poll/submit`: Submit quiz answers.
- **GET** `poll/result/{email}`: Retrieve individual score.
- **GET** `poll/results`: View the Scoreboard.
