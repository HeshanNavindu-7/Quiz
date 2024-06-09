import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase';

const StartScreen = ({ setUserName }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleStart = async () => {
        if (name.trim() === '') {
            setError('Please enter your name.');
            return;
        }

        setUserName(name);
        try {
            await addDoc(collection(db, 'results'), { userName: name, score: 0 });
            navigate('/guidelines');
        } catch (err) {
            console.error('Error saving user data: ', err);
            setError('Failed to start the quiz. Please try again.');
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto bg-gray-800 text-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-center">Welcome to the Quiz</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-2 px-4 mb-4 rounded-md text-black"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
                className="py-3 px-6 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-600 active:bg-yellow-700 mx-auto block"
                onClick={handleStart}
            >
                Start
            </button>
        </div>
    );
};

export default StartScreen;
