import Cookies from "js-cookie";



export const fetchPlans = async() => {
    try {
        const response = await fetch('/api/user/get-plans', {
            method: 'GET',
        });

        if(!response.ok){
            // Handle the case where the server response was not ok
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const plansData = await response.json();
        return plansData;
        
    } catch (err) {
        console.error('Error', err)
        if(err instanceof SyntaxError) {
            console.error('The server response is not valid JSON.');
        } else {
            console.error('Some other error occurred:', err.message);
        }
    }
}