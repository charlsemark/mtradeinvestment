import Cookies from "js-cookie";

// Create a new plan
export const createNewPlan = async (formData) => {
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const finalData = await response.json();
        return finalData;
        
    } catch (err) {
        console.error('Error', err);
        if (err instanceof SyntaxError) {
            console.error('The server response is not valid JSON.');
        } else {
            console.error('Some other error occurred:', err.message);
        }
    }
}

// Start a new plan investment
export const startNewPlan = async (formData) => {
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const planData = await response.json();
        return planData;

    } catch (error) {
        console.error('Error', error);
        if (error instanceof SyntaxError) {
            console.error('The server response is not valid JSON.');
        } else {
            console.error('Some other error occurred:', error.message);
        }
    }
}

// Fetch a single plan by ID
export const getSinglePlan = async (id) => {
    try {
        const response = await fetch(`/api/admin/get-plan/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const planData = await response.json();
        return planData;

    } catch (error) {
        console.error('Error', error);
        if (error instanceof SyntaxError) {
            console.error('The server response is not valid JSON.');
        } else {
            console.error('Some other error occurred:', error.message);
        }
    }
}
