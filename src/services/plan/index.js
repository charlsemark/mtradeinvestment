import Cookies from "js-cookie";

export const createNewPlan = async(formData) => {
    try {
        const response = await fetch('/api/admin/create-plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            // Handle the case where the server response was not ok
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const finalData = await response.json();
        return finalData;
        
    } catch (err) {
        console.error('Error', err);
        // You may want to handle different types of errors differently
        if (err instanceof SyntaxError) {
            console.error('The server response is not valid JSON.');
        } else {
            console.error('Some other error occurred:', err.message);
        }
    }
}

export const startNewPlan = async(formData) => {
    try {
        const response = await fetch(`/api/user/start-investment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            // Handle the case where the server response was not ok
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const planData = await response.json();
        return planData;

    } catch (error) {
        console.error('Error', error);
        // You may want to handle different types of errors differently
        if (err instanceof SyntaxError) {
            console.error('The server response is not valid JSON.');
        } else {
            console.error('Some other error occurred:', error.message);
        }
    }
}