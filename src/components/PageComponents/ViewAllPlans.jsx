"use client"

const ViewAllPlans = () => {
    return(
        <>
        <div className="container mx-auto px-10 py-20">
            <div className="w-min-[320px] w-max-[560px] bg-[#007bff] text-white flex flex-col justify-center text-center items-center rounded-[20px] py-10 px-8">
                <h1 className="text-2xl mb-6 font-bold">Ready to start Investing?</h1>
                <a className="py-3 px-7 rounded-xl bg-white text-black hover:bg-gray-500 duration-500 ease-in-out transition-all" href="/investments">
                    View Our Plans
                </a>
            </div>
        </div>
        </>
    )
}

export default ViewAllPlans;