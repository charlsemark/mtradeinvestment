"use client"

import SpinLoading from "@/components/Loader/pageLevel";
import Notifications from "@/components/Notifications";
import { fetchUsers } from "@/services/fetchUsers";
import { updateUser } from "@/services/user";
import { useEffect, useState } from "react";

const Investments = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsersData();
    }, []);

    async function fetchUsersData() {
        try {
            const usersData = await fetchUsers();
            console.log(usersData);
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }

    const allUsers = users?.users || [];
    const allPlans = allUsers.flatMap(user => user.plans || []);

    function calculateRemainingTime(elapseTime) {
        if (!elapseTime) {
            return 'Undefined date';
        }

        const currentTime = new Date();
        const elapseTimeDate = new Date(elapseTime);
        if (isNaN(elapseTimeDate.getTime())) {
            return 'Invalid date';
        }

        if (currentTime >= elapseTimeDate) {
            return '0 days';
        }

        const timeDifference = elapseTimeDate - currentTime;
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return `${days} days`;
    }

    return (
        <div className="w-screen mx-auto pt-16 text-[#333] p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-semibold mb-4">All Investments</h2>
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Return</th>
                            <th className="p-3 text-left">Time Left</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-3 text-center">
                                    <SpinLoading />
                                </td>
                            </tr>
                        ) : allPlans.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-3 text-center">
                                    No Investment Yet
                                </td>
                            </tr>
                        ) : (
                            allPlans.filter((user) => user.role !== 'admin').map((user) => (
                                <tr key={user.id} className="border-t border-gray-600">
                                    <td className="p-3">{user?.amount}</td>
                                    <td className="p-3">{user?.returnInvestment}</td>
                                    <td className="p-3">{calculateRemainingTime(user?.elapseTime)}</td>
                                    <td className="p-3">
                                        {user?.status?.isActive ? (
                                            <p className="text-green-500">Active</p>
                                        ) : user?.status?.isCompleted ? (
                                            <p className="text-yellow-400">Completed</p>
                                        ) : ''}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Notifications />
        </div>
    );
}

export default Investments;
