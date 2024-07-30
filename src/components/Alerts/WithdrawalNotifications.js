'use client'
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifications = [
    { id: 1, user: 'Sandra', amount: 750 },
    { id: 2, user: 'Howard', amount: 1500 },
    { id: 3, user: 'Kelvin Halm', amount: 300 },
    { id: 4, user: 'Alfred', amount: 5000 },
    { id: 5, user: 'Charlse', amount: 9050 },
    // Add more notifications as needed
];

export default function WithdrawalNotifications() {
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            const { user, amount } = notifications[index];
            toast.success(`${user} has withdrawn $${amount}`, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                progress: undefined,
            });
            index = (index + 1) % notifications.length; // Cycle through the list
        }, 4000); // Change the interval as needed

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <ToastContainer />
        </div>
    );
}
