"use client"

// import Investments from "@/app/investments/page";
import SpinLoading from "@/components/Loader/pageLevel";
import Notifications from "@/components/Notifications";
import TransactionCard from "@/components/PageComponents/TransactionCard";
import UserCard from "@/components/PageComponents/UserCard";
import { fetchUsers } from "@/services/fetchUsers";
import { updateUser } from "@/services/user";
import { useEffect, useState } from "react";



const Investments = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetchUsersData();
    }, [fetchUsers]);

    async function fetchUsersData() {
        try {
            const usersData = await fetchUsers();
            console.log(usersData);
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching plans:', error);
        } finally {
            setLoading(false);
        }
    }

    const allUsers = users?.users;
    const lengthOfUser = users?.users?.length;
    console.log(allUsers)
    // console.log(allPlans)

    const allPlans = allUsers?.flatMap(user => user.plans || []);

    console.log(allPlans);

    function calculateRemainingTime(elapseTime) {
        if (!elapseTime) {
          return 'Undefined date';
        }
      
        const currentTime = new Date();
        console.log(elapseTime);
        
        // Check if elaspeTime is a valid date string
        const elaspeTimeDate = new Date(elapseTime);
        if (isNaN(elaspeTimeDate.getTime())) {
          return 'Invalid date';
        }
      
        // Check if current time is higher than elaspeTime
        if (currentTime >= elaspeTimeDate) {
          return '0 days';
        }
      
        // Calculate remaining time in days
        const timeDifference = elaspeTimeDate - currentTime;
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      
        return `${days} days`;
      }
      
      
      

    function handleApprove(investmentId) {
        console.log(investmentId)
        try {
            console.log("Hey Guy...");
            const response = updateUser(
                {
                    investmentId,
                    investment: {
                        status: {
                            isCompleted: true
                        },
                    },
                },
            );
            console.log(response);
            if (response?.success) {
                toast.success("Investment Completed!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                // setComponentLevelLoader({ loading: false, id: '' })
            } else {
                if (response?.error) {
                    toast.error("Error updating transaction", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                // setComponentLevelLoader({ loading: false, id: '' })
            }
        } catch (error) {
            console.log("Error updating transaction:", error);
            toast.error("Something went wrong. Please try again later.", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    function handleDecline(transactionsId) {
        try {
            console.log("Hey Guy...");
            const response = updateUser(
                {
                    transactionsId,
                    transactions: {
                        status: {
                            isRejected: true
                        },
                    },
                },
            );
            console.log(response);
            if (response?.success) {
                toast.success("Transaction Declined!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                // setComponentLevelLoader({ loading: false, id: '' })
            } else {
                if (response?.error) {
                    toast.error("Error updating transaction", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
                // setComponentLevelLoader({ loading: false, id: '' })
            }
        } catch (error) {
            console.log("Error updating transaction:", error);
            toast.error("Something went wrong. Please try again later.", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    function handleClose() {
        setSelectedUserId(null);
    }

    return (
        <div className="w-screen mx-auto pt-16 text-[#333] p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-semibold mb-4">All Investments</h2>
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr>
                            {/* <th className="p-3 text-left">Reciept</th> */}
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Return</th>
                            <th className="p-3 text-left">Time Left</th>
                            <th className="p-3 text-left">Status</th>
                            {/* <th className="p-3 text-left">Edit</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {!allPlans ? (
                            <tr className="flex items-center justify-center">
                                <SpinLoading />
                            </tr>
                        ) : (
                            <>
                                {allPlans?.filter((user) => user.role !== 'admin').map((user) => (
                                    <tr key={user.id} className="border-t border-gray-600">
                                        {/* <td className="p-3">
                                            <img src={user.receipt || "/profile.png"} alt={`User ${user.name}`} className="w-10 h-10 rounded-full object-cover" />
                                        </td> */}
                                        <td className="p-3">{user?.amount}</td>
                                        <td className="p-3">{user?.returnInvestment}</td>
                                        <td className="p-3">{calculateRemainingTime(user?.elapseTime)}</td>
                                        <td className="p-3">
                                            {user?.status?.isActive ? (<p className="text-green-500">Active</p>) : user?.status?.isCompleted ? (<p className="text-yellow-400">Completed</p>) : ''}
                                        </td>
                                        {/* <td className="p-3 flex gap-1 items-center">
                                            {
                                                user?.status?.isRejected ? ('') : (
                                                    <button
                                                        onClick={() => handleApprove(user?.planId)}
                                                        className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
                                                        // disabled={user?.status?.isApproved}
                                                    >
                                                        Approve
                                                    </button>
                                                ) *
                                            }
                                            {/* {user?.status?.isApproved ? ('') : (<button
                                                onClick={() => handleDecline(user?._id)}
                                                className="bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded"
                                                disabled={user?.status?.isRejected}
                                            >
                                                {!user?.status?.isRejected ? 'Decline' : 'Declined'}
                                            </button>)} */}

                                        {/* </td> */}
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
            <Notifications />
        </div>
    )
}


export default Investments;