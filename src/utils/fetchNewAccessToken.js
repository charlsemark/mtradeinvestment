import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const fetchNewAccessToken = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get('token');
      if (!token) {
        console.log('No token found');
        return; // Exit early if no token
      }

      try {
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

        if (success && newAccessToken) {
          Cookies.set('token', newAccessToken);
          console.log('Token refreshed and cookie updated');
        } else if (newToken.message === 'Token has Expired') {
          console.log('Token has expired');
          Cookies.remove('token');
          router.push('/login');
        } else {
          console.error('Failed to fetch new token:', newToken.message);
        }
      } catch (error) {
        console.error('Error fetching new token:', error.message);
        router.push('/login');
      }
    };

    checkToken();
  }, [router]);

  return null;
};

export default fetchNewAccessToken;
