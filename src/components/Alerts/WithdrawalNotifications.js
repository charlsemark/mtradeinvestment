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
    { id: 6, user: 'Linda', amount: 1200 },
    { id: 7, user: 'David', amount: 450 },
    { id: 8, user: 'Sophia', amount: 2500 },
    { id: 9, user: 'Michael', amount: 600 },
    { id: 10, user: 'Emily', amount: 3500 },
    { id: 11, user: 'Joshua', amount: 10000 },
    { id: 12, user: 'Hannah', amount: 800 },
    { id: 13, user: 'Matthew', amount: 2400 },
    { id: 14, user: 'Isabella', amount: 3300 },
    { id: 15, user: 'William', amount: 4700 },
    { id: 16, user: 'Olivia', amount: 1500 },
    { id: 17, user: 'James', amount: 12000 },
    { id: 18, user: 'Ava', amount: 1800 },
    { id: 19, user: 'Alexander', amount: 9800 },
    { id: 20, user: 'Mia', amount: 4200 },
    { id: 21, user: 'Daniel', amount: 2900 },
    { id: 22, user: 'Ella', amount: 6700 },
    { id: 23, user: 'Christopher', amount: 500 },
    { id: 24, user: 'Madison', amount: 3600 },
    { id: 25, user: 'Anthony', amount: 7300 },
    { id: 26, user: 'Abigail', amount: 4100 },
    { id: 27, user: 'Joseph', amount: 11000 },
    { id: 28, user: 'Mason', amount: 2700 },
    { id: 29, user: 'Charlotte', amount: 8300 },
    { id: 30, user: 'Ethan', amount: 5200 },
    { id: 31, user: 'Amelia', amount: 6000 },
    { id: 32, user: 'Samuel', amount: 9400 },
    { id: 33, user: 'Victoria', amount: 2300 },
    { id: 34, user: 'Benjamin', amount: 15000 },
    { id: 35, user: 'Grace', amount: 7400 },
    { id: 36, user: 'Gabriel', amount: 4100 },
    { id: 37, user: 'Zoe', amount: 5800 },
    { id: 38, user: 'Logan', amount: 2100 },
    { id: 39, user: 'Aiden', amount: 12500 },
    { id: 40, user: 'Layla', amount: 950 },
    { id: 41, user: 'Elijah', amount: 8800 },
    { id: 42, user: 'Chloe', amount: 520 },
    { id: 43, user: 'Liam', amount: 3200 },
    { id: 44, user: 'Ella', amount: 6700 },
    { id: 45, user: 'Oliver', amount: 13300 },
    { id: 46, user: 'Scarlett', amount: 3900 },
    { id: 47, user: 'Henry', amount: 4700 },
    { id: 48, user: 'Riley', amount: 6200 },
    { id: 49, user: 'Lucas', amount: 8700 },
    { id: 50, user: 'Samantha', amount: 5100 },
];


export default function WithdrawalNotifications() {
    useEffect(() => {
        let index = 0;
    
        const showNextNotification = () => {
            if (notifications.length === 0) return; // Exit if no notifications
    
            const { user, amount } = notifications[index];
    
            // Dismiss any existing toasts
            toast.dismiss();
    
            // Show the next notification
            toast.success(`${user} has withdrawn $${amount}`, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                progress: undefined,
            });
    
            // Move to the next notification in the list
            index = (index + 1) % notifications.length;
        };
    
        // Show the first notification immediately
        showNextNotification();
    
        // Set up the interval to show notifications one at a time
        const interval = setInterval(showNextNotification, 4000); // Adjust the interval as needed
    
        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [notifications]);

    return (
        <div>
            <ToastContainer />
        </div>
    );
}
