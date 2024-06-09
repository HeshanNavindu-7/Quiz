import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';

const QuizScreen = ({ userName, setScore }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [score, updateScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const quizCollection = collection(db, 'quizzes');
                const quizSnapshot = await getDocs(quizCollection);
                const quizList = quizSnapshot.docs.map(doc => doc.data());
                setQuizzes(quizList.sort(() => Math.random() - 0.5));
            } catch (err) {
                console.error("Error fetching quizzes: ", err);
                setError('Failed to load quizzes. Please try again.');
            }
        };
        fetchQuizzes();
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleNext();
        }
    }, [timeLeft]);

    const handleAnswer = async (isCorrect) => {
        if (isCorrect) updateScore(score + 1);
        handleNext();
    };

    const handleNext = () => {
        if (currentQuizIndex < quizzes.length - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1);
            setTimeLeft(15);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            const resultsRef = collection(db, 'results');
            const querySnapshot = await getDocs(query(resultsRef, where('userName', '==', userName)));
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    updateDoc(doc.ref, { score });
                });
            }
            setScore(score);
            navigate('/result');
        } catch (err) {
            console.error("Error updating results: ", err);
            setError('Failed to submit your results. Please try again.');
        }
    };

    if (!quizzes.length) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="quiz-content p-8 max-w-4xl mx-auto bg-gray-800 text-white rounded-lg shadow-md">
            <h2 className="timer text-4xl font-bold mb-4 text-center">00 : {timeLeft}</h2>
            <h3 className="question text-2xl font-semibold mb-6">{quizzes[currentQuizIndex].question}</h3>
            <div className="options grid grid-cols-1 gap-4">
                {quizzes[currentQuizIndex].options.map((option, index) => (
                    <button
                        className="option-button py-3 px-6 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-600 active:bg-yellow-700"
                        key={index}
                        onClick={() => handleAnswer(option.isCorrect)}
                    >
                        {option.answer}
                    </button>
                ))}
                <button 
                    className="next-button py-3 px-6 mt-6 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-600 active:bg-yellow-700"
                    onClick={handleNext}
                >
                    Next Question
                </button>
            </div>
            {error && <p className="error-message text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default QuizScreen;
