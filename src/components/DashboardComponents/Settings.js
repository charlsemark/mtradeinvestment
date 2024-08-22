"use client"

import { useContext, useState } from "react"
import ComponentLevelLoader from "../Loader/componentLevel";
import { GlobalContext } from "@/context";
import UserDetailsContext from "@/context/useUser";
import Notifications from "../Notifications";
import { toast } from "react-toastify";
import { updateUser } from "@/services/user";

const initialFormData = {
    newPassword: '',
    confirmNewPassword: '',
}
export default function Settings() {
    const { componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext);
    UserDetailsContext();
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(null);

    const handleNewPassword = (newPassword) => {
        setFormData({
            ...formData,
            newPassword: newPassword,
        })
    };
    const handleConfirmNewPassword = (confirmNewPassword) => {
        setFormData({
            ...formData,
            confirmNewPassword: confirmNewPassword,
        })
    }

    console.log(formData)
    const handleFormSubmit = async () => {
        // Check if passwords match
        if (formData.newPassword !== formData.confirmNewPassword) {
            setError("Passwords do not match");
            return;
        }
        // Reset error if passwords match
        setError(null);
        // To be worked on
        setComponentLevelLoader({ loading: true, id: '' })
        try {
            const response = await updateUser({ password: formData?.newPassword }, user?._id);
            console.log(response);
            if(response?.success){
                toast.success("Password updated!", {
                    position: "top-right",
                });
                setComponentLevelLoader({ loading: false, id: '' })
            }else{
                toast.error("Password update failed", {
                    position: "top-right",
                });
                setComponentLevelLoader({ loading: false, id: '' })
            }
        } catch (error) {
            console.log('Error updating password:', error);
            toast.error('Something went wrong. Please try again later.', {
                position: "top-right",
            });
        }
    }
    return (
        <>
            <div className="text-black">
                <h2 className="mb-2">Change Password</h2>
                <div className="w-[600px] mb-4 border-t-8 border-cyan-600 rounded-lg flex flex-col space-y-3 px-3 items-start py-5 shadow-lg">
                    <div className="flex flex-col gap-2 w-full">
                        <label>New Password<b></b></label>
                        <input className="text-black border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-full" type="text" placeholder="Enter new password" onChange={(e) => handleNewPassword(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label>Confirm New Password<b></b></label>
                        <input className="text-black border-[0.5px] border-gray-400 px-3 py-4 rounded-lg w-full" type="text" placeholder="Confirm new password" onChange={(e) => handleConfirmNewPassword(e.target.value)} />
                    </div>
                    {error && <p className="text-xs tracking-wide text-red-500">{error}</p>}
                    <button className="disabled:opacity-50 flex items-center justify-center bg-[#ff9100] px-6 py-4 text-lg tracking-wide text-white transition-all ease-in-out duration-200 font-medium focus:shadow rounded-md" onClick={handleFormSubmit}>{componentLevelLoader && componentLevelLoader.loading ? <ComponentLevelLoader
                        text={"Loading"}
                        color={"#fff"}
                        loading={componentLevelLoader && componentLevelLoader.loading}
                    /> : "Change Password"}</button>
                </div>
                <Notifications />
            </div>
        </>
    )
};
