"use client"

import SpinLoading from "@/components/Loader/pageLevel";
import UserCard from "@/components/PageComponents/UserCard";
import PrivateRoute from "@/context/PrivateRoute";
import { fetchUsers } from "@/services/fetchUsers";
import { useEffect, useState } from "react";



export default function Users() {
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
  console.log(allUsers)
  const lengthOfUser = users?.users?.length;
  console.log(lengthOfUser)
  // console.log(allPlans)

  function handleEdit(userId) {
    setSelectedUserId(userId);
  }

  function handleClose() {
    setSelectedUserId(null);
  }

  return (
    <PrivateRoute>
      <div className="w-screen mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl font-semibold mb-4">User List</h2>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full border border-gray-200">
            <thead>
              <tr>
                <th className="p-3 text-left">Pics</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Balance</th>
                <th className="p-3 text-left">Profit</th>
                <th className="p-3 text-left">Pin</th>
                <th className="p-3 text-left">Edit</th>
              </tr>
            </thead>
            <tbody>
              {!allUsers ? (
                <tr className="flex items-center justify-center">
                  <SpinLoading />
                </tr>
              ) : (
                <>
                  {allUsers?.filter((user) => user.role !== 'admin').map((user) => (
                    <tr key={user.id} className="border-t border-gray-200">
                      <td className="p-3">
                        <img src={user.profilePicture || "/profile.png"} alt={`User ${user.name}`} className="w-10 h-10 rounded-full object-cover" />
                      </td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">${user.balance}</td>
                      <td className="p-3">${user.profit}</td>
                      <td className="p-3">{user.pin}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleEdit(user?._id)}
                          className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded"
                        >
                          Edit
                        </button>

                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        {selectedUserId && (
          <UserCard
            userId={selectedUserId}
            onClose={handleClose}
          />
        )}
      </div>
    </PrivateRoute>
  )
}