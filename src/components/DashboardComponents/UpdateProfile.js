"use client"
import { useContext, useEffect, useState } from "react"
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseConfig, firebaseStorageURL } from "@/utils"
import ComponentLevelLoader from "../Loader/componentLevel";
import { GlobalContext } from "@/context";
import UserDetailsContext from "@/context/useUser";
import Notifications from "../Notifications";
import { updateUser } from "@/services/user";
import { toast } from "react-toastify";

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
    profilePicture: '',
    phone: '',
    state: '',
    country: '',
    btc: '',
    litecoin: '',
    ethereum: '',
    usdt: '',
}

export default function UpdateProfile({ user }) {
    const { componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext);
    const [formData, setFormData] = useState(initialFormData);
    UserDetailsContext()

    // This is to save the user formal info
    useEffect(() => {
        if (user) {
            setFormData({
                phone: user?.phone,
                state: user?.state,
                country: user?.country,
                btc: user?.wallet?.bitcoin,
                litecoin: user?.wallet?.litecoin,
                ethereum: user?.wallet?.ethereum,
                usdt: user?.wallet?.usdt
            })
        }
    }, [user])


    async function handleImage(e) {
        const extractImageURL = await helperForUploadingImageToFirebase(e.target.files[0]);

        if (extractImageURL !== '') {
            setFormData({
                ...formData,
                profilePicture: extractImageURL,
            })
        }
    }

    const handleContact = (phone) => {
        setFormData({
            ...formData,
            phone: phone,
        });
    };
    const handleState = (state) => {
        setFormData({
            ...formData,
            state: state,
        })
    };
    const handleCountry = (country) => {
        setFormData({
            ...formData,
            country: country,
        })
    }
    const handleBitcoin = (btc) => {
        setFormData({
            ...formData,
            btc: btc,
        });
    };
    const handleLitecoin = (litecoin) => {
        setFormData({
            ...formData,
            litecoin: litecoin,
        });
    };
    const handleEthereum = (ethereum) => {
        setFormData({
            ...formData,
            ethereum: ethereum,
        });
    };
    const handleUSDT = (usdt) => {
        setFormData({
            ...formData,
            usdt: usdt,
        });
    };

    console.log(formData)
    const handleFormSubmit = () => {
        // To be worked on
        setComponentLevelLoader({ loading: true, id: '' })
        try {

            console.log('Hey Guy...')
            const response = updateUser({
                profilePicture: formData?.profilePicture,
                phone: formData?.phone,
                state: formData?.state,
                country: formData?.country,
                btc: formData?.btc,
                litecoin: formData?.litecoin,
                ethereum: formData?.ethereum,
                usdt: formData?.usdt
            }, user?._id)
            console.log(response);
            if (response?.success) {
                toast.success("User updated!", {
                    position: "top-right",
                });
                setComponentLevelLoader({ loading: false, id: '' })
            } else {
                if (response?.error) {
                    toast.error("Error updating user", {
                        position: "top-right",
                    });
                }
                setComponentLevelLoader({ loading: false, id: '' })
            }
        } catch (error) {
            console.log('Error updating profile:', error);
            toast.error('Something went wrong. Please try again later.', {
                position: "top-right",
            });
        }
    }
    return (
        <>
            <div>
                <h2 className="mb-2">Update Account</h2>
                <div className="w-[800px] mb-4 border-t-8 border-cyan-600 rounded-lg flex flex-col space-y-3 px-3 items-start py-5 shadow-lg">
                    {/* Content for Profile Details tab */}
                    <div className="flex flex-col gap-2 w-full">
                        <label>Change profile picture<b></b></label>
                        <input className="text-black w-full border-[0.5px] border-gray-400 px-3 py-4 rounded-lg" placeholder="Change profile picture" accept="image/*" max="1" type="file" onChange={handleImage} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label>Contact<b></b></label>
                        <input className="text-black w-full border-[0.5px] border-gray-400 px-3 py-4 rounded-lg" type="number" placeholder="Enter your contact" onChange={(e) => handleContact(e.target.value)} value={formData?.phone} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label>State<b></b></label>
                        <input className="text-black w-full border-[0.5px] border-gray-400 px-3 py-4 rounded-lg" type="text" placeholder="Enter State" onChange={(e) => handleState(e.target.value)} value={formData?.state} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label>Country<b></b></label>
                        <input className="text-black w-full border-[0.5px] border-gray-400 px-3 py-4 rounded-lg" type="text" placeholder="Enter Country" onChange={(e) => handleCountry(e.target.value)} value={formData?.country} />
                    </div>
                    <div className="flex flex-col gap-2 w-full border-t-10 border-cyan-600 rounded-md">
                        <h2 className="font-semibold mt-2">Wallet Addresses</h2>
                        <div className="flex flex-col gap-2">
                            <label>Bitcoin<b></b></label>
                            <input className="text-black w-full border-[0.5px] border-gray-400 px-3 py-4 rounded-lg" type="text" placeholder="Enter your bitcoin wallet address" onChange={(e) => handleBitcoin(e.target.value)} value={formData?.btc} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>Litecoin<b></b></label>
                            <input className="text-black w-full border-[0.5px] border-gray-400 px-3 py-4 rounded-lg" type="text" placeholder="Enter your litecoin wallet address" onChange={(e) => handleLitecoin(e.target.value)} value={formData?.litecoin} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>Ethereum<b></b></label>
                            <input className="text-black w-full border-[0.5px] border-gray-400 px-3 py-4 rounded-lg" type="text" placeholder="Enter your ethereum wallet address" onChange={(e) => handleEthereum(e.target.value)} value={formData?.ethereum} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label>USDT<b></b></label>
                            <input className="text-black w-full border-[0.5px] border-gray-400 px-3 py-4 rounded-lg" type="text" placeholder="Enter your usdt wallet address" onChange={(e) => handleUSDT(e.target.value)} value={formData?.usdt} />
                        </div>
                    </div>
                    <button className="disabled:opacity-50 flex items-center justify-center bg-[#007bff] px-6 py-4 text-lg tracking-wide text-white transition-all ease-in-out duration-200 font-medium focus:shadow rounded-md" onClick={handleFormSubmit}>{componentLevelLoader && componentLevelLoader.loading ? <ComponentLevelLoader
                        text={"Loading"}
                        color={"#fff"}
                        loading={componentLevelLoader && componentLevelLoader.loading}
                    /> : "Update Account"}</button>
                </div>
                <Notifications />
            </div>
        </>
    )
};