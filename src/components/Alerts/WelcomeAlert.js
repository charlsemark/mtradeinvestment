'use client'

import { useState } from 'react';

const Alert = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <div className="w-screen h-[100vh] fixed bottom-0 left-0 bg-[rgba(39,39,39,0.47)] z-50 grid place-items-start pt-8 md:h-screen">
                    <div className="alert-container flex flex-col mt-10 justify-start mx-auto z-50 bg-white text-black p-4 w-[320px] rounded-xl shadow-lg">
                        <h1 className='flex flex-col gap-[-2.5px] font-medium text-lg tracking-wide mb-3'> 
                         <span>Welcome to</span>
                         <span>Mtrade Investment</span>
                        </h1>
                        <p className='text-sm'>Note: All trades and investments are 100% secured, so all traders should be 100% confident as there will always be success in all trades.</p>
                        <button className=" ml-2 px-2 py-1 bg-white text-blue-500" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Alert;
