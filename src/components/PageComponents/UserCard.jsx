import { deleteUser, fetchUserById, updateUser } from "@/services/user";
import React, { useEffect, useState } from "react";
import SpinLoading from "../Loader/pageLevel";
import Notifications from "../Notifications";
import { toast } from "react-toastify";
// import { fetchUserById } from "@/services/fetchUsers"; // Import your fetchUserById service

const UserCard = ({ userId, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await fetchUserById(userId);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    fetchUserData();
  }, [userId]);

  console.log(userData);
  const User = userData?.user;

  // This is to save the user formal info
  useEffect(() => {
    if (User) {
      setFormData({
        phone: User?.phone,
        state: User?.state,
        country: User?.country,
        name: User?.name,
        balance: User?.balance,
        email: User?.email,
        profit: User?.profit,
        accountUpgrade: User?.accountUpgrade,
        topUpBalance: "replace",
      });
    }
  }, [User]);

  const handlePhone = (phone) => {
    setFormData({
      ...formData,
      phone: phone,
    });
  };
  const handleState = (state) => {
    setFormData({
      ...formData,
      state: state,
    });
  };
  const handleCountry = (country) => {
    setFormData({
      ...formData,
      country: country,
    });
  };
  const handleEmail = (email) => {
    setFormData({
      ...formData,
      email: email,
    });
  };

  const handleAccountUpgrade = (accountUpgrade) => {
    setFormData({
      ...formData,
      accountUpgrade: accountUpgrade,
    });
  };

  // console.log(accountUpgrade)

  const handleProfit = (profit) => {
    setFormData({
      ...formData,
      profit: profit,
    });
  };
  const handleBalance = (balance) => {
    setFormData({
      ...formData,
      balance: Number(balance),
    });
  };
  console.log(formData);
  async function handleDeleteUser() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        console.log("Hey Guy Delete Am!...");
        // console.log("User ID!...", User?._id);
        const response = await deleteUser(User?._id);
        console.log(response);
        if (response?.success) {
          toast.success("User deleted!", {
            position: "top-right",
          });
          // setComponentLevelLoader({ loading: false, id: '' })
        } else {
          if (response?.error) {
            toast.error("Error deleting user", {
              position: "top-right",
            });
          }
          // setComponentLevelLoader({ loading: false, id: '' })
        }
      } catch (error) {
        console.log("Error deleting user:", error);
        toast.error("Something went wrong. Please try again later.", {
          position: "top-right",
        });
      }
    }
  }

  console.log(formData)
  async function handleUpdate() {
    try {
      console.log("Hey Guy...");
      const response = await updateUser(
        {
          ...formData,
        },
        User?._id
      );
      console.log(response);
      if (response?.success) {
        toast.success("User updated!", {
          position: "top-right",
        });
        // setComponentLevelLoader({ loading: false, id: '' })
      } else {
        if (response?.error) {
          toast.error("Error updating user", {
            position: "top-right",
          });
        }
        // setComponentLevelLoader({ loading: false, id: '' })
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
      });
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center text-black justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96 h-full overflow-scroll customized_scrollbar">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>

        {!userData ? (
          <SpinLoading />
        ) : (
          <div className="flex-flex-col items-start space-y-2">
            {/* <img
              src={User?.profilePicture || "/profile.png"}
              alt={`User ${User?.name}`}
              className="w-20 h-20 rounded-full object-cover mb-4"
            /> */}
            <p className="text-black text-base">
              You can update user balance here
            </p>

            <div className="flex flex-col gap-2">
              <label>
                <b>Name:</b>
              </label>
              {/* <input
                className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto placeholder:text-black text-black"
                type="text"
                placeholder={`${User?.phone}`}
                // onChange={(e) => handleName(e.target.value)}
                value={formData?.phone}
              /> */}
              <p className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto placeholder:text-black text-black">
                {User?.phone}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label>
                <b>Email:</b>
              </label>
              {/* <input
                className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto placeholder:text-black text-black"
                type="email"
                placeholder={`${User?.email}`}
                onChange={(e) => handleEmail(e.target.value)}
                value={formData?.email}
              /> */}
              <p className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto placeholder:text-black text-black">
                {User?.email}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label>
                <b>State:</b>
              </label>
              {/* <input
                className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto placeholder:text-black text-black"
                type="text"
                placeholder={`${User?.state  || 'State'}`}
                onChange={(e) => handleState(e.target.value)}
                value={formData?.state}
              /> */}
              <p className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto placeholder:text-black text-black">
                {User?.state || "State"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label>
                <b>Country:</b>
              </label>
              {/* <input
                className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto placeholder:text-black text-black"
                type="text"
                placeholder={`${User?.country  || 'Country'}`}
                onChange={(e) => handleCountry(e.target.value)}
                value={formData?.country}
              /> */}
              <p className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto placeholder:text-black text-black">
                {User?.country || "Country"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label>
                <b>Contact:</b>
              </label>
              {/* <input
                className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto placeholder:text-black text-black"
                type="text"
                placeholder={`${User?.phone}`}
                onChange={(e) => handlePhone(e.target.value)}
                value={formData?.phone}
              /> */}
              <p className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto placeholder:text-black text-black">
                {User?.phone}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label>
                <b>Upgrade Account:</b>
              </label>
              <select
                className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto"
                value={formData?.accountUpgrade}
                onChange={(e) => handleAccountUpgrade(e.target.value)}
              >
                <option value="isDefault">-- Select Upgrade</option>
                <option value="isNeeded">Needed</option>
                <option value="isApproved">Approved</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>
                <b>Profit:</b>
              </label>
              <input
                className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto placeholder:text-black text-black"
                type="text"
                placeholder={`${User?.profit || "$0"}`}
                onChange={(e) => handleProfit(e.target.value)}
                value={formData?.profit}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>
                <b>Balance:</b>
              </label>
              <input
                className="focus-none border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-auto placeholder:text-black text-black"
                type="text"
                placeholder={`${User?.balance}`}
                onChange={(e) => handleBalance(e.target.value)}
                value={formData?.balance}
              />
            </div>

            {/* Add more user details as needed */}

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-700 text-black font-semibold px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                onClick={() => handleUpdate(User?._id)}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={handleDeleteUser}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      <Notifications />
    </div>
  );
};

export default UserCard;
