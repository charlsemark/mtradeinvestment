"use client"

import { GlobalContext } from "@/context";
import { createWalletAddressControls, firebaseConfig, firebaseStorageURL } from "@/utils"
import { useContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { createWalletAddress } from "@/services/wallet";
import ComponentLevelLoader from "../Loader/componentLevel";
import SelectComponent from "../FormElements/SelectComponent";
import InputComponent from "../FormElements/InputComponent";
import Notifications from "../Notifications";
import { toast } from "react-toastify";
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
    const storageReference = ref(storage, `indexcopier/wallets/${getFileName}`);
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
    walletAddress: '',
    imageUrl: ''
}

export default function AddWalletAddress() {
    const [formData, setFormData] = useState(initialFormData);
    const { componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext);
    const router = useRouter();


    async function handleImage(e) {
        const extractImageURL = await helperForUploadingImageToFirebase(e.target.files[0]);

        if (extractImageURL !== '') {
            setFormData({
                ...formData,
                imageUrl: extractImageURL,
            })
        }
    }

    console.log(formData)

    async function handleCreateWallet() {
        setComponentLevelLoader({ loading: true, id: '' })
        const res = await createWalletAddress(formData);
        console.log(res);
        console.log(res?.success);
        console.log(res?.success);
        if (res?.success) {
            toast.success(res?.message, {
                position: "top-right",
            });
            setFormData(initialFormData);
            setComponentLevelLoader({ loading: false, id: '' })
            router.reload()
        } else {
            toast.error(res?.message, {
                position: "top-right",
            });
            // setFormData(initialFormData);
            setComponentLevelLoader({ loading: false, id: '' })
        }
    }
    return (
        <>
            <div className="text-[#333]">
                <div className="w-full mt-6 mx-0 mb-0 space-y-6">
                    <input className="border placeholder-gray-500 focus:outline-none focus:border-black w-full p-4 mx-0 mb-0 text-base block bg-white border-gray-300 rounded-lg" accept="image/*" max="1" type="file" onChange={handleImage} />
                    <div className="flex gap-8 flex-col">
                        {
                            createWalletAddressControls.map(controlItem =>
                                controlItem.componentType === 'select' ? (
                                    <SelectComponent
                                        key={controlItem.id}
                                        label={controlItem.label}
                                        options={controlItem.options}
                                        value={formData[controlItem.id]}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                [controlItem.id]: e.target.value,
                                            });
                                        }}
                                    />
                                ) :
                                    controlItem.componentType === 'input' ?
                                        (
                                            <InputComponent
                                                type={controlItem.type}
                                                placeholder={controlItem.placeholder}
                                                label={controlItem.label}
                                                key={controlItem.id}
                                                value={formData[controlItem.id]}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        [controlItem.id]: e.target.value,
                                                    });
                                                }}
                                            />
                                        ) : null)
                        }
                        <button className="disabled:opacity-50 flex items-center justify-center bg-[#007bff] px-6 py-4 text-lg tracking-wide text-white transition-all ease-in-out duration-200 font-medium focus:shadow rounded-md mt-4" onClick={handleCreateWallet}>
                            {componentLevelLoader && componentLevelLoader.loading ? <ComponentLevelLoader
                                text={"Adding Wallet"}
                                color={"#fff"}
                                loading={componentLevelLoader && componentLevelLoader.loading}
                            /> : "Add Wallet"}
                        </button>
                    </div>
                </div>
                <Notifications />
            </div>
        </>
    )
}