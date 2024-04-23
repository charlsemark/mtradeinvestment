import Cookies from "js-cookie";

export const createNewCopier = async(formData) => {
    try {
        const response = await fetch('/api/admin/create-copier', {
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



export const fetchCopiers = async() => {
    try {
        const response = await fetch('/api/user/get-copiers', {
            method: 'GET',
        });

        if(!response.ok){
            // Handle the case where the server response was not ok
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const copiersData = await response.json();
        return copiersData;
        
    } catch (err) {
        console.error('Error', err)
        if(err instanceof SyntaxError) {
            console.error('The server response is not valid JSON.');
        } else {
            console.error('Some other error occurred:', err.message);
        }
    }
}
