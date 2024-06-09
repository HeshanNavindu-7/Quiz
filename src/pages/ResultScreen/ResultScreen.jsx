import React from 'react';


const ResultScreen = ({ userName, score }) => {
    return (
        <div className='result-screen'>
            <h2>Quiz completed!</h2>
            <p>{userName}, your score is: {score}</p>
        </div>
    );
};

export default ResultScreen;
