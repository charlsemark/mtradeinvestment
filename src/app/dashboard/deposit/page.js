"use client"

import DepositComponent from "@/components/DashboardComponents/DepositComponent";
import NavigationBar from "@/components/NavigationBar";
import { useContext, useEffect, useState } from "react"
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseConfig, firebaseStorageURL } from "@/utils"
import { GlobalContext } from "@/context";
import { fetchAllWallets } from "@/services/wallet";
import axios from "axios";
import Cookies from "js-cookie";
import { fundUserBalance } from "@/services/user";
import ComponentLevelLoader from "@/components/Loader/componentLevel";
import { toast } from "react-toastify";
import Notifications from "@/components/Notifications";
import UserDetailsContext from "@/context/useUser";
import { useRouter } from "next/navigation";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);

    return `${getFile}-${timeStamp}-${randomStringValue}`
}


async function helperForUploadingImageToFirebase(file) {
    const getFileName = createUniqueFileName(file);
    const storageReference = ref(storage, `indexcopier/deposit/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);


    return new Promise((resolve, reject) => {
        uploadImage.on('state_changed', (snapshot) => { }, (error) => {
            console.log(error)
            reject(error)
        }, () => {
            getDownloadURL(uploadImage.snapshot.ref).then(downloadURL => resolve(downloadURL)).catch(error => reject(error))
        })
    })
}

const initialFormData = {
    walletName: '',
    amount: '',
    receipt: '',
}

export default function Deposit() {
    UserDetailsContext();
    const { isAuthUser, user, setUser, setIsAuthUser, componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext);
    const [wallets, setWallets] = useState([]);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [formData, setFormData] = useState(initialFormData);
    const [shouldShowNavigationBar, setShouldShowNavigationBar] = useState(false);
    const router = useRouter();

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

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAllWallets();
            console.log(result?.wallets);
            if (result.success) {
                setWallets(result?.wallets);
            } else {
                // Handle error
                console.error(result.message);
            }
        };
        fetchData();
    }, [setUser]);

    // const walletNames = wallets.map(wallet => wallet.walletName);

    // console.log(walletNames)

    const handleWalletChange = (walletName) => {
        const selectedWallet = wallets?.find(wallet => wallet.walletName === walletName);
        setSelectedWallet(selectedWallet);
    };

    const handleAmountChange = (amount) => {
        setFormData({
            ...formData,
            amount: amount,
        });
    };

    async function handleImage(e) {
        const extractImageURL = await helperForUploadingImageToFirebase(e.target.files[0]);

        if (extractImageURL !== '') {
            setFormData({
                ...formData,
                receipt: extractImageURL,
            })
        }
    }

    console.log(formData)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Validate receipt field before submitting
        if (!formData.receipt) {
            // Display an error message or handle the lack of receipt
            console.error('Please upload a receipt before submitting.');
            toast.error('Please upload a receipt before submitting.', {
                position: "top-right",
            });
            return;
        }
        setComponentLevelLoader({ loading: true, id: '' })
        try {
            // Perform the fund user account action
            const result = await fundUserBalance(formData);
            if (result?.success) {
                toast.success(result?.message, {
                    position: "top-right",
                });
                setFormData(initialFormData);
                setComponentLevelLoader({ loading: false, id: '' })
                router.push('/dashboard')
            } else {
                toast.error(result?.message, {
                    position: "top-right",
                });
                // setFormData(initialFormData);
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
        <div className="flex text-[#333] bg-white">
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
                            <p className="font-semibold text-lg">Add Money</p>
                            <a href="/dashboard/transactions">
                                <button className="bg-[#007bff] px-3 py-3 text-white text-sm tracking-wide rounded-md">Deposit History</button>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 px-4 pt-8 pb-4">
                        <div>
                            <p><b>NB:</b> Please make sure to upload the proof of payment to help verify your payment</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Select Wallet Address:</p>
                            <select className="border placeholder-gray-500 focus:outline-none focus:border-black w-full p-4 mx-0 mb-0 text-base block bg-white text-black border-gray-300 rounded-lg" onChange={(e) => {
                                handleWalletChange(e.target.value);
                                setFormData({
                                    ...formData,
                                    walletName: e.target.value,
                                    // walletAddress: selectedWallet?.walletAddress || '',
                                });
                            }}>
                                <option defaultValue="Select Wallet">Select Wallet</option>
                                {wallets?.map(wallet => (
                                    <option>{wallet.walletName}</option>
                                ))}
                            </select>
                        </div>
                        {/* {selectedWallet && ( */}
                        <div className="flex flex-col gap-2">
                            <p>Selected Wallet Address:</p>
                            <p className="border placeholder-gray-500 focus:outline-none focus:border-black w-full p-4 mx-0 mb-0 text-base block bg-white text-black border-gray-300 rounded-lg">{selectedWallet?.walletAddress || "Select a wallet"}</p>
                        </div>
                        {/* // )} */}
                        <div className="flex flex-col gap-2">
                            <p>Enter Amount(USD):</p>
                            <input className="border-[0.5px] border-gray-400 px-3 py-4 text-black rounded-lg" placeholder="Enter amount" type="number" onChange={(e) => handleAmountChange(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Upload Proof of Payment<b>*</b></label>
                            <input className="border-[0.5px] border-gray-400 px-3 py-4 rounded-lg" placeholder="upload reciept" accept="image/*" max="1" type="file" onChange={handleImage} />
                        </div>
                        <button className="disabled:opacity-50 flex items-center justify-center bg-[#007bff] px-6 py-4 text-lg tracking-wide text-white transition-all ease-in-out duration-200 font-medium focus:shadow rounded-md" onClick={handleFormSubmit}>{componentLevelLoader && componentLevelLoader.loading ? <ComponentLevelLoader
                            text={"Loading"}
                            color={"#fff"}
                            loading={componentLevelLoader && componentLevelLoader.loading}
                        /> : "Fund Account"}</button>
                    </div>
                </div>
            </div>
            <Notifications />
        </div>
    )
}