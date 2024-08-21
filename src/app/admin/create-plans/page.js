"use client"

import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent"
import ComponentLevelLoader from "@/components/Loader/componentLevel";
import { GlobalContext } from "@/context";
import { adminCreateInvestmentControls, firebaseConfig, firebaseStorageURL } from "@/utils"
import { useContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { createNewPlan } from "@/services/plan";
import { toast } from "react-toastify";
import Notifications from "@/components/Notifications";


const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);

    return `${getFile}-${timeStamp}-${randomStringValue}`
}


async function helperForUploadingImageToFirebase(file) {
    const getFileName = createUniqueFileName(file);
    const storageReference = ref(storage, `indexcopier/plans/${getFileName}`);
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
    planName: '',
    minPrice: '',
    maxPrice: '',
    roiPeriod: '',
    roi: '',
}

export default function AdminPlans() {
    const [formData, setFormData] = useState(initialFormData);
    const { componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext);



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
    async function handleCreatePlan() {
        setComponentLevelLoader({ loading: true, id: '' })
        const res = await createNewPlan(formData)
        console.log(res);
        console.log(res?.success);
        if (res?.success) {
            toast.success(res?.message, {
                position: "top-right",
            });
            setFormData(initialFormData);
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
        <div className="w-screen mx-auto p-4 sm:p-6 lg:p-8 text-[#333] pt-28">
            <p className="text-lg ml-8 mb-4">Admin Dashboard - Investment Plans Page</p>
            <div className="flex flex-col items-start justify-start p-6 md:p-10 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mt-6 mx-0 mb-0 space-y-6">
                    <input accept="image/*" max="1" type="file" onChange={handleImage} />
                    <div className="flex gap-8 flex-col">
                        {
                            adminCreateInvestmentControls.map(controlItem =>
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
                                    )
                                    :

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
                                    ) : null)
                        }
                        <button className="disabled:opacity-50 flex items-center justify-center bg-[#007bff] px-6 py-4 text-lg tracking-wide text-white transition-all ease-in-out duration-200 font-medium focus:shadow rounded-md mt-4" onClick={handleCreatePlan}>
                            {componentLevelLoader && componentLevelLoader.loading ? <ComponentLevelLoader
                                text={"Creating Plan"}
                                color={"#fff"}
                                loading={componentLevelLoader && componentLevelLoader.loading}
                            /> : "Create Plan"}
                        </button>
                    </div>
                </div>
            </div>
            <Notifications />
        </div>
    )
}