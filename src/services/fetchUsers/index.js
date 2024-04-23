import Cookies from "js-cookie";



export const fetchUsers = async() => {
    try {
        const response = await fetch('/api/admin/get-users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });

        if(!response.ok){
            // Handle the case where the server response was not ok
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const usersData = await response.json();
        return usersData;
        
    } catch (err) {
        console.error('Error', err)
        if(err instanceof SyntaxError) {
            console.error('The server response is not valid JSON.');
        } else {
            console.error('Some other error occurred:', err.message);
        }
    }
}