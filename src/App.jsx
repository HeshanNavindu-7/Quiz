import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './pages/StartScreen/StartScreen';
import GuidelineScreen from './pages/GuidelineScreen/GuidelineScreen';
import QuizScreen from './pages/QuizScreen/QuizScreen';
import ResultScreen from './pages/ResultScreen/ResultScreen';

const App = () => {
    const [userName, setUserName] = useState('');
    const [score, setScore] = useState(0);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartScreen setUserName={setUserName} />} />
                <Route path="/guidelines" element={<GuidelineScreen />} />
                <Route path="/quiz" element={<QuizScreen userName={userName} setScore={setScore} />} />
                <Route path="/result" element={<ResultScreen userName={userName} score={score} />} />
            </Routes>
        </Router>
    );
};

export default App;
