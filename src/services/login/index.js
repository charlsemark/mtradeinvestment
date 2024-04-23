export const loginUser = async(formData) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            // Handle the case where the server response was not ok
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const finalResult = await response.json();
        return finalResult;
        
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
