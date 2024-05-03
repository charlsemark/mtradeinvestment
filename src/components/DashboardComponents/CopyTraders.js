import { fetchCopiers } from "@/services/copier";
import { useEffect, useState } from "react"

export default function CopyTradesComp() {
    const [messageOne, setMessageOne] = useState(false)
    const [copiers, setCopiers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCopiersData();
    }, [fetchCopiers]);

    async function fetchCopiersData() {
        try {
            const copiersData = await fetchCopiers();
            setCopiers(copiersData);
        } catch (error) {
            console.error('Error fetching copiers:', error);
        } finally {
            setLoading(false);
        }
    }

    const allCopiers = copiers?.copiers;
    console.log(allCopiers.length)


    const handleCopyOne = () => {
        setMessageOne(true)
        setTimeout(() => {
            setMessageOne(false)
        }, 2000)
    }


    return (
        <div className="text-[#333] py-5 space-y-10 rounded-lg px-3 customized_scroll">
            <h2>Copy trades from experts</h2>
            {allCopiers == 0 ? (<p className="text-center">No copier</p>) : (
                allCopiers?.map(copier => (
                    <div key={copier._id} className={`border-t-4 border-cyan-600 rounded-md p-3 shadow-lg flex items-center justify-between  ${messageOne ? 'border-green-400' : 'border-cyan-600 '}`}>
                        <div className="flex items-center gap-2">
                            <img src={copier?.imageUrl} alt="main pics" className="w-12 h-12 rounded-full object-cover" />
                            <div className="flex flex-col items-start gap-1">
                                <p className="text-sm tracking-wide font-semibold">{copier?.name}</p>
                                <p className="text-xs">@{copier?.username}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span><span className="text-green-400">{copier?.bonus}%</span> Bonus</span>
                            <button onClick={handleCopyOne} className={`text-xs px-3 py-2 text-white font-semibold rounded-md transition-all ease-in-out duration-400 ${messageOne ? 'bg-green-400' : 'bg-gray-400 '}`}>{messageOne ? 'Copied!' : 'Copy Trade'}</button>
                        </div>
                    </div>
                ))
            )}

        </div>
    )
}