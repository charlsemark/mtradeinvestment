import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { GlobalContext } from ".";
import { useRouter } from "next/navigation";

const fetchNewAccessToken = async () => {
  // const router = useRouter();

// console.log('Hey Chief')
  try {

    const token = Cookies.get('token');
    // console.log(token)
    // useEffect(() => {
      console.log(token)
      // function fetchCurrentToken(token) {
        const response = await fetch('/api/user/refreshToken/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const newToken = await response.json();
        console.log(newToken);
        const { success, token: newAccessToken } = newToken;

        if (success) {
          // Cookies.set('token', newAccessToken)
          console.log('Cookie has been set')
        } else {
          if(newToken.message === 'Token has Expired'){
            console.log('Cookie has expired')
            Cookies.remove('token')
            // router.push('/admin-login')
            window.location.href = "/login";
          }
          console.error('Failed to fetch new token:', response.data.message);
        }
      // }
      // fetchCurrentToken(token)
    // }, [token])
  } catch (error) {
    // Handle other errors, such as network issues
    console.error('Error fetching new token:', error.message);
  }
}

export default fetchNewAccessToken;
