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
                theme: "dark",
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
