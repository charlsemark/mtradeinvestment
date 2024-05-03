"use client"

import SpinLoading from "@/components/Loader/pageLevel";
import Notifications from "@/components/Notifications";
import TransactionCard from "@/components/PageComponents/TransactionCard";
import UserCard from "@/components/PageComponents/UserCard";
import { fetchUsers } from "@/services/fetchUsers";
import { updateUser } from "@/services/user";
import { useEffect, useState } from "react";



const Transactions = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetchUsersData();
    }, [fetchUsers]);

    async function fetchUsersData() {
        try {
            const usersData = await fetchUsers();
            // console.log(usersData);
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching plans:', error);
        } finally {
            setLoading(false);
        }
    }

    const allUsers = users?.users;
    const lengthOfUser = users?.users?.length;
    // console.log(allUsers)
    // console.log(allPlans)

    const allTransactions = allUsers?.flatMap(user => user.transactions || []);
    // const mainTransc = allTransactions?.flatMap(transactions => transactions.transc || []);

    // console.log(allTransactions);

    function handleApprove(transactionsId) {
        try {
            // console.log(transactionsId);
            const response = updateUser(
                {
                    transactionsId,
                    transactions: {
                        status: {
                            isApproved: true
                        },
                    },
                },
            );
            // console.log(response);
            if (response?.success) {
                toast.success("Transaction Approved!", {
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

    // async function handleDecline(transactionsId) {
    //     try {
    //         console.log("Hey Guy...");
    //         const response = await updateUser(
    //             {
    //                 transactionsId,
    //                 transactions: {
    //                     status: {
    //                         isRejected: true
    //                     },
    //                 },
    //             },
    //         );
    //         console.log(response);
    //         if (response?.success) {
    //             toast.success("Transaction Declined!", {
    //                 position: toast.POSITION.TOP_RIGHT,
    //             });
    //             // setComponentLevelLoader({ loading: false, id: '' })
    //         } else {
    //             if (response?.error) {
    //                 toast.error("Error updating transaction", {
    //                     position: toast.POSITION.TOP_RIGHT,
    //                 });
    //             }
    //             // setComponentLevelLoader({ loading: false, id: '' })
    //         }
    //     } catch (error) {
    //         console.log("Error updating transaction:", error);
    //         toast.error("Something went wrong. Please try again later.", {
    //             position: toast.POSITION.TOP_RIGHT,
    //         });
    //     }
    // }

    function handleClose() {
        setSelectedUserId(null);
    }

    return (
        <div className="w-screen mx-auto p-4 sm:p-6 lg:p-8 text-[#333] mt-36">
            <h2 className="text-2xl font-semibold mb-4">All Transactions</h2>
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full border border-gray-800">
                    <thead>
                        <tr>
                            <th className="p-3 text-left">Reciept</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Balance</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!allTransactions ? (
                            <tr className="flex items-center justify-center">
                                <SpinLoading />
                            </tr>
                        ) : (
                            <>
                                {allTransactions?.filter((user) => user.role !== 'admin').map((user) => (
                                    <tr key={user.id} className="border-t border-gray-600">
                                        <td className="p-3">
                                            <img src={user.receipt || "/profile.png"} alt={`User ${user.name}`} className="w-10 h-10 rounded-full object-cover" />
                                        </td> 
                                        <td className="p-3">{user.transactionType}</td>
                                        <td className="p-3">{user.walletName}</td>
                                        <td className="p-3">${user.amount
                                        }</td>
                                        <td className="p-3">
                                            {user?.status?.isPending ? (<p className="text-red-900">Pending</p>) : user?.status?.isRejected ? (<p className="text-red-400">Declined</p>) : (<p className="text-green-600">Approved</p>)}
                                        </td>
                                        <td className="p-3 flex gap-1 items-center">
                                            {
                                                user?.status?.isRejected ? ('') : (
                                                    <button
                                                        onClick={() => handleApprove(user?._id)}
                                                        className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
                                                        disabled={user?.status?.isApproved}
                                                    >
                                                        {!user?.status?.isApproved ? 'Approve' : 'Approved'}
                                                    </button>
                                                )
                                            }
                                            {/* {user?.status?.isApproved ? ('') : (<button
                                                onClick={() => handleDecline(user?._id)}
                                                className="bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded"
                                                disabled={user?.status?.isRejected}
                                            >
                                                {!user?.status?.isRejected ? 'Decline' : 'Declined'}
                                            </button>)} */}

                                        </td>
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


export default Transactions;