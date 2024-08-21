"use client"

import { GlobalContext } from "@/context";
import UserDetailsContext from "@/context/useUser";
import { MailOpenIcon, MapPinned, UserCheck } from "lucide-react";
import { useContext, useState } from "react";



export default function ProfileDetails({ userProfit, userImage, userName, userEmail, userID, userBalance, state, country }) {
    UserDetailsContext();
    const {user} = useContext(GlobalContext);
    // const [formData, setFormData] = useState({
    //     userImage: user?.profilePicture || '',
    //     userName: user?.name || '',
    //     userEmail: user?.email || '',
    //     userID: user?._id || '',
    //     userBalance: user?.balance || '',
    //     state: user?.state || '',
    //     country: user?.country || '',
    // });


    return (
        <>
            <div className="max-w-[800px] w-full text-black font-medium shadow-xl pt-0 p-5 space-y-10 rounded-lg">
                {/* Content for Profile Details tab */}
                <div className="border-t-2 border-cyan-600 rounded-t-lg py-5 shadow-lg">
                    <div className="flex flex-col items-center">
                        <div className="w-40 h-40 rounded-full">
                            <img className="object-cover rounded-full border-[0.3px] border-gray-500 " src={userImage || '/profile.webp'} width={300} height={300} alt={userName} />
                        </div>
                        <h2 className="my-2">{userName}</h2>
                    </div>
                    <div className="flex flex-col gap-6 px-3">
                        <div className="flex items-center justify-between">
                            <span>Acount Balance:</span>
                            <span>${userBalance}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Total Profit:</span>
                            <span>${userProfit}</span>
                        </div>
                    </div>
                </div>
                <div className="border-t-8 border-cyan-600 rounded-lg flex flex-col space-y-8 px-3 items-start py-5 shadow-lg">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-normal text-gray-600">
                            <MailOpenIcon className="w-5 h-5" />
                            <p>Email</p>
                        </div>
                        <p className="text-lg font-bold tracking-wide">{userEmail}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-[3px] font-normal text-gray-600">
                            <UserCheck className="w-5 h-5" />
                            <p>Account ID</p>
                        </div>
                        <p className="text-lg font-bold tracking-wide">{userID}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-[3px] font-normal text-gray-600">
                            <MapPinned className="w-5 h-5" />
                            <p>State</p>
                        </div>
                        <p className="text-lg font-bold tracking-wide">{state}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-[3px] font-normal text-gray-600">
                            <MapPinned className="w-5 h-5" />
                            <p>Country</p>
                        </div>
                        <p className="text-lg font-bold tracking-wide">{country}</p>
                    </div>
                </div>
                {/* Add your profile details components here */}
            </div>
        </>
    )
};

// export default ProfileDetails;