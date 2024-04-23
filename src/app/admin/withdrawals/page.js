

export default function Withdraws() {
  return (
    <div className="flex flex-col space-y-6 px-4">
      <p className="text-lg my-5 py-4 border-b-[0.5px] border-gray-500">Welcome To All Withdraws</p>

      {/* <div className="border border-1 border-gray-400 h-[150px] flex flex-col justify-center p-4 rounded-lg">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-1">

            <span>Total Balance: <b>$2000</b></span>
            <span>Total Users: <b>6</b></span>
            <span>Total Deposits: <b>4</b></span>
          </div>

        </div>
      </div> */}
      <a className="mt-1.5 inline-block bg-[#fd961a] py-2 px-5 text-xs font-medium tracking-wide text-white rounded-xl w-fit" href="admin/plans">
        Create Plans
      </a>
      <a className="mt-1.5 inline-block bg-[#fd961a] py-2 px-5 text-xs font-medium tracking-wide text-white rounded-xl w-fit" href="admin/add-wallet">
        Add Wallet Address
      </a>
    </div>
  )
}