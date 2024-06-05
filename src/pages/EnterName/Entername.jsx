import React, { useState } from 'react';
import user from '../../../utils/user_services';

const Entername = ({ setUserName }) => {
    const [userName, setLocalUserName] = useState('');

    const checkUserpass = async () => {
        const isSubmitted = await user.isUserSubmitted(userName);
        if (isSubmitted) {
            alert("Username is already used");
        } else {
            setUserName(userName); // Pass the username to the parent component
        }
    };

    return (
        <div className='m-auto w-fit relative top-96 flex flex-wrap items-center justify-center'>
            <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setLocalUserName(e.target.value)}
                className='text-4xl p-4 text-black'
            />
            <button
                style={{ backgroundColor: "#FCE300", color: "black" }}
                className='p-4 text-4xl hover:bg-black hover:text-white active:bg-white active:text-black'
                onClick={checkUserpass}
            >
                Start Quiz
            </button>
        </div>
    );
};

export default Entername;
