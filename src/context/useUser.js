import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { GlobalContext } from ".";
import { useRouter } from "next/navigation";

const protectedRoutes = ['/dashboard', '/admin']; // Add all your protected routes here

const UserDetailsContext = () => {
    const { setUser } = useContext(GlobalContext);
    const router = useRouter();

    useEffect(() => {
        const fetchLoginUser = async () => {
            const token = Cookies.get('token');
            const isProtectedRoute = protectedRoutes.includes(router.pathname);

            if (!token) {
                if (isProtectedRoute) {
                    router.push('/login'); // Redirect only if it's a protected route
                }
                return;
            }

            try {
                const response = await axios.get('/api/user/get-user/', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { success, user: fetchedUser } = response.data;

                if (success) {
                    setUser(fetchedUser);
                } else {
                    console.error('Failed to fetch user details:', response.data.message);
                    if (isProtectedRoute) {
                        router.push('/login'); // Redirect only if it's a protected route
                    }
                }
            } catch (error) {
                console.error('Error fetching user details:', error.message);

                if (error.response && error.response.status === 401) {
                    Cookies.remove('token');
                    if (isProtectedRoute) {
                        router.push('/login'); // Redirect only if it's a protected route
                    }
                } else {
                    if (isProtectedRoute) {
                        router.push('/login'); // Redirect only if it's a protected route
                    }
                }
            }
        };

        fetchLoginUser();
    }, [setUser, router]);

    return null;
};

export default UserDetailsContext;
