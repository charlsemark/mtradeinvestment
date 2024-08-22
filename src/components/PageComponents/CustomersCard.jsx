const stats = [
  { id: 1, name: "Transactions every 24 hours", value: "44 million" },
  { id: 2, name: "Assets under holding", value: "$119 trillion" },
  { id: 3, name: "New users annually", value: "46,000" },
];

export default function Customers() {
  return (
    <div className="bg-white py-26 px-8">
      <div className="text-center space-y-2 mb-8 pt-10">
        <p className="text-[#ff9100] font-bold text-2xl md:text-4xl tracking-wide">
          Trusted by clients worldwide
        </p>
        <p className="text-base text-gray-600">
          We're are committed to pushing the boundaries of investments.
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-10">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-8 md:gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-1 md:gap-y-4"
            >
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
