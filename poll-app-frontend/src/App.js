import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Result from './components/Result';
import AllResults from './components/AllResults';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/results" element={<AllResults/>}/>
        <Route path="/all-results" element={<AllResults />} />
      </Routes>
    </Router>
  );
}

export default App;
