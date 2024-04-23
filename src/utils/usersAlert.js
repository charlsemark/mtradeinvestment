"use client"

import { useState, useEffect } from 'react';

const UserAlerts = () => {
    const [users, setUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCard, setShowCard] = useState(false);

    const dummyUsers = [
        { id: 1, name: 'John Doe', content: 'Just funded my account $12000' },
        { id: 2, name: 'Jane Doe 2', content: 'Just funded my withdrawed $12000' },
        { id: 2, name: 'Jane Doe 3', content: 'Just created an account' },
        { id: 2, name: 'Jane Doe 4', content: 'Just died' },
        // Add more users as needed
    ];

    useEffect(() => {
        const timeoutShow = setTimeout(() => {
          setShowCard(true);
        }, 5000 * currentIndex);
    
        const timeoutHide = setTimeout(() => {
          setShowCard(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyUsers.length);
        }, 5000 * currentIndex + 5000);
    
        return () => {
          clearTimeout(timeoutShow);
          clearTimeout(timeoutHide);
        };
      }, [currentIndex]);
    return (
        <>
            {showCard && (
                <div className="alert-container absolute left-20 top-[400px] transform flex flex-col justify-start mx-auto z-99 bg-[#fd961a] p-4 w-auto rounded-xl shadow-lg transition-transform duration-500 ease-in-out">
                    <p>{dummyUsers[currentIndex].name} {dummyUsers[currentIndex].content}</p>
                </div>
            )}
        </>
    );
};

export default UserAlerts;
