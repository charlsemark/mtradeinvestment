import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { GlobalContext } from ".";

const UserDetailsContext = async () => {
    const { setUser } = useContext(GlobalContext)

    try {
        const token = Cookies.get('token'); // replace with your actual authentication token

        useEffect(() => {
            const fetchLoginUser = async () => {


                const response = await axios.get('/api/user/get-user/', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response);
                const { success, user: fetchedUser } = response.data;

                if (success) {
                    // Set the logged-in user in your global context or state
                    setUser(fetchedUser);
                } else {
                    // Handle the case where fetching user failed
                    console.error('Failed to fetch user details:', response.data.message);
                }
            }
            fetchLoginUser()
        }, [])
    } catch (error) {
        // Handle other errors, such as network issues
        console.error('Error fetching user details:', error.message);
    }
}

export default UserDetailsContext;
