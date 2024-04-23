

export default function SelectComponent({ label, value, onChange, options = [] }){
    return(
        <div className="relative">
            <p className="py-0 px-2 -mt-3 mr-0 mb-0 font-medium text-[#007bff]">{label}</p>
            <select value={value} onChange={onChange} className="border placeholder-[#007bff] text-black  focus:outline-none focus:border-[#007bff] w-full p-4 mx-0 mb-0 text-base block bg-white border-gray-300 rounded-lg">
                {
                    options && options.length ? (
                        options.map(optionItem => (
                             <option
                              id={optionItem.id}
                              value={optionItem.id} 
                              key={optionItem.id}
                             >
                                {optionItem.label}
                             </option>
                           )
                        )
                    ) : <option id="" value={""}>Select</option>
                }
            </select>
        </div>
    )
}