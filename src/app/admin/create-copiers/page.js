"use client"

import ComponentLevelLoader from "@/components/Loader/componentLevel";
import NavigationBar from "@/components/NavigationBar";
import { GlobalContext } from "@/context";
import UserDetailsContext from "@/context/useUser";
import { useContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseConfig, firebaseStorageURL } from "@/utils"
import { toast } from "react-toastify";
import Notifications from "@/components/Notifications";
import { createNewCopier } from "@/services/copier";
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
    const storageReference = ref(storage, `indexcopier/profile/${getFileName}`);
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
    imageUrl: '',
    name: '',
    username: '',
    bonus: '',
}


export default function Copiers() {
    UserDetailsContext();
    const { user, componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext);
    // const [selectedWallet, setSelectedWallet] = useState(null);
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

    async function handleImage(e) {
        const extractImageURL = await helperForUploadingImageToFirebase(e.target.files[0]);

        if (extractImageURL !== '') {
            setFormData({
                ...formData,
                imageUrl: extractImageURL,
            })
        }
    }

    // const handleWalletChange = (walletName) => {
    //     const selectedWallet = wallets?.find(wallet => wallet.walletName === walletName);
    //     setSelectedWallet(selectedWallet);
    // };

    const handleName = (name) => {
        setFormData({
            ...formData,
            name: name,
        });
    };

    const handleUsername = (username) => {
        setFormData({
            ...formData,
            username: username,
        });
    };

    const handleBonus = (bonus) => {
        setFormData({
            ...formData,
            bonus: bonus,
        });
    };

    console.log(formData)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Validate receipt field before submitting
        if (!formData.imageUrl) {
            // Display an error message or handle the lack of receipt
            console.error('Please upload an image before submitting.');
            toast.error('Please upload an image before submitting.', {
                position: "top-right",
            });
            return;
        }
        setComponentLevelLoader({ loading: true, id: '' })
        const res = await createNewCopier(formData)
        console.log(res);
        console.log(res?.success);
        if (res?.success) {
            toast.success(res?.message, {
                position: "top-right",
            });
            setFormData(initialFormData);
            router.push('/dashboard/trades')
            setComponentLevelLoader({ loading: false, id: '' })
        } else {
            toast.error(res?.message, {
                position: "top-right",
            });
            // setFormData(initialFormData);
            setComponentLevelLoader({ loading: false, id: '' })
        }
    }


    return (
        <div className="flex text-[#333] pt-16">
            {shouldShowNavigationBar && (
                <div className="fixed left-0 h-screen">
                    <NavigationBar username={user?.name} />
                </div>
            )}
            {/* Main Component */}
            <div className="relative right-0 flex flex-2 flex-col gap-8 border border-l-0 border-t-0 border-r-1 w-full md:flex-1 left-0 md:left-[220px] overflow-x-auto overflow-scroll px-4">
                <div className="flex flex-col w-full mt-5 mx-0 mb-0 border-[0.5px] rounded-sm border-gray-600">
                    <div className="border-b-[1px] border-gray-600">
                        <div className="flex items-center px-4 py-6 justify-between">
                            <p className="font-semibold text-lg">Create Copiers</p>
                            <a href="/dashboard/trades" className="bg-[#ff9100] px-3 py-3 text-white text-sm tracking-wide rounded-md">View Copiers</a>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 px-4 pt-8 pb-4">
                        <div>
                            <p><b>NB:</b> Copiers are expert traders</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Expert Profile Image<b>*</b></label>
                            <input className="border-[0.5px] border-gray-400 px-3 py-4 rounded-lg" placeholder="upload reciept" accept="image/*" max="1" type="file" onChange={handleImage} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Enter Name:</p>
                            <input className="border-[0.5px] border-gray-400 px-3 py-4 text-black rounded-lg" placeholder="Enter Name" type="text" onChange={(e) => handleName(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Enter Username:</p>
                            <input className="border-[0.5px] border-gray-400 px-3 py-4 text-black rounded-lg" placeholder="Username" type="text" onChange={(e) => handleUsername(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Bonus:</p>
                            <input className="border-[0.5px] border-gray-400 px-3 py-4 text-black rounded-lg" placeholder="E.g.. 20%" type="number" onChange={(e) => handleBonus(e.target.value)} />
                        </div>


                        <button className="disabled:opacity-50 flex items-center justify-center bg-[#ff9100] px-6 py-4 text-lg tracking-wide text-white transition-all ease-in-out duration-200 font-medium focus:shadow rounded-md" onClick={handleFormSubmit}>{componentLevelLoader && componentLevelLoader.loading ? <ComponentLevelLoader
                            text={"Loading"}
                            color={"#fff"}
                            loading={componentLevelLoader && componentLevelLoader.loading}
                        /> : "Create Copier"}</button>
                    </div>
                </div>
            </div>
            <Notifications />
        </div>
    )
}