import React from 'react';
import { useNavigate } from 'react-router-dom';

const GuidelineScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="p-8 max-w-4xl mx-auto bg-gray-800 text-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-center">Quiz Guidelines</h1>
            <ul className="list-disc list-inside mb-6">
                <li>Read each question carefully.</li>
                <li>You have 15 seconds to answer each question.</li>
                <li>Once you submit your answer, you cannot change it.</li>
                <li>Your score will be updated in real-time.</li>
            </ul>
            <button
                className="py-3 px-6 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-600 active:bg-yellow-700 mx-auto block"
                onClick={() => navigate('/quiz')}
            >
                Take Quiz
            </button>
        </div>
    );
};

export default GuidelineScreen;
