import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import GuidelineScreen from './pages/GuidelineScreen/GuidelineScreen';
import QuizScreen from './pages/QuizScreen/QuizScreen';
import ResultScreen from './pages/ResultScreen/ResultScreen';
import StartScreen from './pages/StartScreen/StartScreen';


const App = () => {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path="/" element={< StartScreen />} />
          <Route path="/guidelines" element={<GuidelineScreen />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/result" element={<ResultScreen />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App