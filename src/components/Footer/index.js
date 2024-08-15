

export default function Footer() {
    return (
        <footer className="w-full bg-[#fff] border-t-[0.5px] border-gray-200 sm:mx-auto">
            <div className="mx-auto w-full px-10 py-18 lg:py-20">
                <div className="md:flex md:justify-between">
                    <div className="my-6">
                        <a href="/" className="flex items-center">
                            <img src="/loh.png" className="h-10 w-auto mr-1" alt=" Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">SPIKETRADER</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-[#333] uppercase">OUR CONTACTS</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <a href="/" className="hover:underline text-gray-500"> 506 Howard Street, Suite 4200, USA</a>
                                </li>
                                <li>
                                    <a href="tel:+15205211397" className="hover:underline text-gray-500">+15013094404</a>
                                </li>
                                <li>
                                    <a href="mailto:support@spiketrader.online" className="hover:underline text-gray-500"> support@spiketrader.online</a>
                                </li>
                                <li>
                                    <a href="/" className="hover:underline text-gray-500"> Opening Hours: <span className="font-semibold">24/7 Available</span></a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-[#333] uppercase">QUICK LINKS</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <a href="/" className="hover:underline text-gray-500">Home</a>
                                </li>
                                <li>
                                    <a href="/about-us" className="hover:underline text-gray-500">About Us</a>
                                </li>
                                <li>
                                    <a href="/faq" className="hover:underline text-gray-500">FAQs</a>
                                </li>
                                <li>
                                    <a href="/terms" className="hover:underline text-gray-500">Terms and Conditions</a>
                                </li>
                                <li>
                                    <a href="/login" className="hover:underline text-gray-500">Create Account</a>
                                </li>
                                <li>
                                    <a href="/login" className="hover:underline text-gray-500">Account Login</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-900 sm:mx-auto lg:my-8" />
                <div className="text-gray-900">
                    <p className="text-sm">
                        Spiketrader is one of the leading platforms in the United States offering binary options, Forex and spreads. Regulated by the CFTC and based in Manchester. It is also regulated by the IFSC of Belize, as well as the Cyprus Securities and Exchange Commission
                    </p>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between text-gray-900
                ">
                    <span className="text-sm text-gray-500 sm:text-center">© 2023 <a href="/" className="hover:underline">SPIKETRADER™</a>. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}