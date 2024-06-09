// Quiz.jsx

import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { db } from '../../../firebase';



const QuizScreen = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(-1);
    const [score, setScore] = useState(0);
    const [userName, setUserName] = useState('');
    const [timeLeft, setTimeLeft] = useState(15);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Retrieve username from local storage
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
            setCurrentQuizIndex(0);
        } else {
            // Handle case when username is not found in local storage
            console.error("Username not found ");
        }


        const fetchQuizzes = async () => {
            const quizCollection = collection(db, 'quizzes');
            const quizSnapshot = await getDocs(quizCollection);
            const quizList = quizSnapshot.docs.map(doc => doc.data());
            const shuffledQuizzes = quizList.sort(() => Math.random() - 0.5);
            setQuizzes(shuffledQuizzes);
            sessionStorage.setItem('shuffledQuizzes', JSON.stringify(shuffledQuizzes));
        };

        const storedQuizzes = JSON.parse(sessionStorage.getItem('shuffledQuizzes'));
        if (storedQuizzes) {
            setQuizzes(storedQuizzes);
        } else {
            fetchQuizzes();
        }
    }, []);

    useEffect(() => {
        const storedQuizData = JSON.parse(sessionStorage.getItem('quizData'));
        if (storedQuizData) {
            setQuizzes(storedQuizData.quizzes);
            setCurrentQuizIndex(storedQuizData.currentQuizIndex);
            setScore(storedQuizData.score);
            setUserName(storedQuizData.userName);
            setTimeLeft(storedQuizData.timeLeft);
            setIsSubmitted(storedQuizData.isSubmitted);
        }
    }, []);

    useEffect(() => {
        if (currentQuizIndex !== -1) {
            const quizData = {
                quizzes,
                currentQuizIndex,
                score,
                userName,
                timeLeft,
                isSubmitted
            };
            sessionStorage.setItem('quizData', JSON.stringify(quizData));
        }
    }, [quizzes, currentQuizIndex, score, userName, timeLeft, isSubmitted]);

    useEffect(() => {
        let timer;
        if (currentQuizIndex >= 0 && currentQuizIndex < quizzes.length) {
            if (timeLeft === 0) {
                handleNext();
            } else {
                timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            }
        }
        return () => clearTimeout(timer);
    }, [timeLeft, currentQuizIndex, quizzes.length]);

    const handleAnswer = async (isCorrect) => {
        let newScore = score;
        if (isCorrect) {
            newScore++;
        }
        setScore(newScore);

        const resultsRef = collection(db, 'results');
        const querySnapshot = await getDocs(query(resultsRef, where('userName', '==', userName)));

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                updateDoc(doc.ref, { score: newScore });
            });
        }

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
        setIsSubmitted(true);
        console.log('Quiz submitted'); // Add this line for debugging
        // Rest of the function
        sessionStorage.setItem('quizData', JSON.stringify({
            quizzes,
            currentQuizIndex,
            score,
            userName,
            timeLeft,
            isSubmitted: true
        }));
        localStorage.setItem('userName', userName);
        localStorage.setItem('score', score);
    };

    // const startQuiz = (name) => {
    //     setUserName(name);
    //     setCurrentQuizIndex(0);
    // };

    return (
        <div className='bg-black w-full h-screen text-white'>
            {!isSubmitted ? (
                <div>
                    {currentQuizIndex === -1 ? (
                        <h2>something went wrong!</h2>
                    ) : (
                        currentQuizIndex >= 0 && currentQuizIndex < quizzes.length && (
                            <div className='m-auto w-fit relative top-24'>
                                <h2 className='text-center' style={{ fontSize: "86px" }}>00 : {timeLeft}</h2>
                                <h3 style={{ fontSize: "36px", maxWidth: "1220px" }} className='m-auto'>{quizzes[currentQuizIndex].question}</h3>
                                <div className='ml-40 mt-10'>
                                    {quizzes[currentQuizIndex].options.map((option, index) => (
                                        <button
                                            className='p-5 m-2 active:bg-white active:text-black'
                                            style={{ border: "3px #FCE300 solid", borderRadius: "12px", width: "600px", height: "96px", fontSize: "32px" }}
                                            key={index}
                                            onClick={() => handleAnswer(option.isCorrect)}
                                        >
                                            {option.answer}
                                        </button>
                                    ))}
                                    <button
                                        onClick={handleNext}
                                        style={{ width: "457px", height: "80px", borderRadius: "12px", backgroundColor: "#FCE300", fontSize: "36px" }}
                                        className='text-black m-auto ml-96'
                                    >
                                        Next Question
                                    </button>
                                </div>
                            </div>
                        )
                    )}
                </div>
            ) : (
                <div className='text-center text-4xl'>
                    <h2>Quiz completed!</h2>
                    <p>{userName}, your score is: {score}</p>
                    <Navigate to='/result' />
                </div>
            )}
        </div>
    );
};

export default QuizScreen;
