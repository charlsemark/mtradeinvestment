"use client"

import ComponentLevelLoader from "@/components/Loader/componentLevel";
import NavigationBar from "@/components/NavigationBar";
import Notifications from "@/components/Notifications";
// import NavigationBar from "@/components/NavigationBar";
import { GlobalContext } from "@/context";
import UserDetailsContext from "@/context/useUser";
import { userWithdrawal } from "@/services/user";
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";


const initialFormData = {
    walletName: '',
    amount: '',
    walletAddress: '',
}

export default function Withdraw() {
    UserDetailsContext()
    const { user, isAuthUser, componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext);
    const [wallets, setWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [formData, setFormData] = useState(initialFormData);
    const [shouldShowNavigationBar, setShouldShowNavigationBar] = useState(false);

    useEffect(() => {
        // Check if window is defined (to avoid SSR errors)
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setShouldShowNavigationBar(window.innerWidth > 768);
            };

            // Initial check and add resize event listener
            handleResize();
            window.addEventListener('resize', handleResize);

            // Clean up the event listener on component unmount
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    const userWallets = user?.wallet;
    // Extract keys and values from userWallets
    const walletEntries = Object.entries(userWallets || {});

    // Separate keys (wallet names) and values (wallet addresses)
    const walletNames = walletEntries.map(([walletName]) => walletName);
    const walletAddresses = walletEntries.map(([, walletAddress]) => walletAddress);

    const handleAmountChange = (amount) => {
        setFormData({
            ...formData,
            amount: amount,
        });
    };

    const handleWalletChange = (selectedWalletName) => {
        const selectedWalletAddress = userWallets?.[selectedWalletName] || '';
        setFormData({
            ...formData,
            walletName: selectedWalletName,
            walletAddress: selectedWalletAddress,
        });
    };

    console.log(formData)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Validate receipt field before submitting
        if (!formData.walletName) {
            // Display an error message or handle the lack of receipt
            console.error('Please select a wallet.');
            toast.error('Please select a wallet.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (!formData.walletAddress) {
            // Display an error message or handle the lack of receipt
            console.error('Please make sure address is selected.');
            toast.error('Please make sure address is selected.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (!formData.amount) {
            // Display an error message or handle the lack of receipt
            console.error('Amount not entered');
            toast.error('Amount not entered.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (user?.balance <= formData.amount) {
            console.error('Insufficient balance.');
            toast.error('Insufficient balance.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        setComponentLevelLoader({ loading: true, id: '' })
        try {
            // Perform the fund user account action
            const result = await userWithdrawal(formData);
            if (result?.success) {
                toast.success("Withdrawal request created", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setFormData(initialFormData);
                setComponentLevelLoader({ loading: false, id: '' })
            } else {
                toast.error("Something went wrong.", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setFormData(initialFormData);
                setComponentLevelLoader({ loading: false, id: '' })
            }
            // Handle the result as needed
            console.log(result);
        } catch (error) {
            // Handle errors
            console.error('Error funding user account:', error);
        }
    }
    return (
        <div className="flex bg-white">
            {shouldShowNavigationBar && (
                <div className="fixed left-0 h-screen">
                    <NavigationBar username={user?.name} />
                </div>
            )}
            {/* Main Component */}
            <div className="mx-auto flex items-center justify-center flex-2 flex-col gap-8 border border-l-0 border-t-0 border-r-1 max-w-[800px] md:flex-1 left-0 md:left-[220px]  px-4 mt-28">
                <div className="flex flex-col w-full mt-5 mx-0 mb-0 border-[0.5px] rounded-sm border-gray-200">
                    <div className="border-b-[1px] border-gray-600">
                        <div className="flex items-center px-4 py-6 justify-between">
                            <p className="font-semibold text-lg">Withdrawal</p>
                            <button className="bg-[#007bff] px-3 py-3 text-white text-sm tracking-wide rounded-md">Withdrawal History</button>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 px-4 pt-8 pb-4">
                        <div className="text-black">
                            <p><b>NB:</b> Note that your withdrawal request will be attended to as soon as possible. And will need to be approved by the admin.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Select Wallet Address:</p>
                            <select
                                className="border placeholder-gray-500 focus:outline-none focus:border-black w-full p-4 mx-0 mb-0 text-base block bg-white text-black border-gray-300 rounded-lg "
                                onChange={(e) => handleWalletChange(e.target.value)}
                            >
                                <option defaultValue="Select Wallet">Select Wallet</option>
                                {walletNames.map((walletName) => (
                                    <option className="uppercase" key={walletName} value={walletName}>
                                        {walletName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Selected Wallet Address:</p>
                            <p className="border placeholder-gray-500 focus:outline-none focus:border-black w-full p-4 mx-0 mb-0 text-base block bg-white text-black border-gray-300 rounded-lg">
                                {formData.walletAddress || 'Select a wallet'}
                            </p>
                        </div>
                        {/* <div className="flex flex-col gap-2">
                            <p>Selected Wallet Address:</p>
                            <select className="border placeholder-gray-500 focus:outline-none focus:border-black w-full p-4 mx-0 mb-0 text-base block bg-white border-gray-300 rounded-lg">
                                <option defaultValue="Select the address">Select a wallet</option>
                                {walletAddresses?.map(walletAddress => (
                                    <option className="">{walletAddress}</option>
                                ))}
                            </select>
                        </div> */}
                        <div className="flex flex-col gap-2">
                            <p>Enter Amount(USD):</p>
                            <input className="border-[0.5px] text-black border-gray-400 px-3 py-4 rounded-lg" placeholder="Enter amount" type="number" onChange={(e) => handleAmountChange(e.target.value)} />
                        </div>
                        {/* <div className="flex flex-col gap-2">
                            <label>Upload Proof of Payment<b>*</b></label>
                            <input className="border-[0.5px] border-gray-400 px-3 py-4 rounded-lg" placeholder="upload reciept" accept="image/*" max="1" type="file" onChange={handleImage} />
                        </div> */}
                        <button className="disabled:opacity-50 flex items-center justify-center bg-[#007bff] px-6 py-4 text-lg tracking-wide text-white transition-all ease-in-out duration-200 font-medium focus:shadow rounded-md" onClick={handleFormSubmit}>{componentLevelLoader && componentLevelLoader.loading ? <ComponentLevelLoader
                            text={"Loading"}
                            color={"#fff"}
                            loading={componentLevelLoader && componentLevelLoader.loading}
                        /> : "Withdraw"}</button>
                    </div>
                </div>
            </div>
            <Notifications />
        </div>
    )
}