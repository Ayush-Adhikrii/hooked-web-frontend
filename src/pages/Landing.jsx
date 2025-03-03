import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    return (
        <main className="relative overflow-hidden min-h-screen flex flex-col bg-gradient-to-b from-[#E03368] to-[#ff6699] text-white">
            <header className="h-20 flex items-center w-full px-6 lg:px-16">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="uppercase font-extrabold text-4xl tracking-wider">
                        HOOKED
                    </div>
                    <button className="lg:hidden flex flex-col space-y-1">
                        <span className="w-7 h-1 bg-white rounded"></span>
                        <span className="w-7 h-1 bg-white rounded"></span>
                        <span className="w-7 h-1 bg-white rounded"></span>
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <div className="flex-1 flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-16 py-8">
                <div className="lg:w-1/2 text-center lg:text-left space-y-4">
                    <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                        Here's to Dating<br />
                        <span className="">with confidence!</span>
                    </h1>
                    <p className="text-lg lg:text-xl opacity-90">
                        Helping to put more of the real you in, for dating you feel good about.
                    </p>

                    <div className="mt-6">
                        <Link to="/auth" className="bg-white hover:bg-transparent text-[#E03368] hover:text-[#FFFFFF] font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300">
                            Sign in
                        </Link>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="lg:w-1/2 flex justify-center">
                    <img
                        src="/hero_section.png"
                        alt="Dating Illustration"
                        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full drop-shadow-lg"
                    />
                </div>
            </div>

            {/* Second Banner - Finding the Right Match */}
            <div className="flex flex-col-reverse lg:flex-row items-center bg-white justify-between px-6 lg:px-16 py-12">
                <div className="lg:w-1/2 flex justify-center">
                    <img
                        src="/second_banner.png"
                        alt="Finding the Right Match"
                        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full drop-shadow-lg"
                    />
                </div>
                <div className="lg:w-1/2 text-center lg:text-left space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-pink-500">
                        Find the Partner<br />
                        <span className="text-pink-700">You’re Looking For</span>
                    </h1>
                    <p className="text-lg lg:text-xl opacity-90 text-gray-700">
                        Our unique algorithm helps you match with like-minded individuals who share your interests and values.
                    </p>

                    <div className="mt-6">
                        <Link to="/auth" className="bg-pink-500 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            {/* Third Banner - Are You Ready? (Full Screen) */}
            <div className="flex flex-col lg:flex-row items-center bg-gradient-to-b from-[#E03368] to-[#ff6699] justify-between px-6 lg:px-16 min-h-screen">
                <div className="lg:w-1/2 text-center lg:text-left space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                        Are you ready to find <br />
                        <span className="text-white">your perfect partner?</span>
                    </h1>
                    <p className="text-lg lg:text-xl opacity-90">
                        Start your journey today and connect with people who truly complement you.
                    </p>

                    <div className="mt-6">
                        <Link to="/auth" className="bg-white hover:bg-transparent text-[#E03368] hover:text-[#FFFFFF] font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300">
                            Sign in
                        </Link>
                    </div>
                </div>

                {/* Third Banner Image */}
                <div className="lg:w-1/2 flex justify-center">
                    <img
                        src="/fourth_section.png"
                        alt="Love and Connection"
                        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full drop-shadow-lg"
                    />
                </div>
            </div>

            {/* Fourth Banner - Trust & Success (Full Screen) */}
            <div className="flex flex-col-reverse lg:flex-row items-center bg-white justify-between px-6 lg:px-16 min-h-screen">
                <div className="lg:w-1/2 flex justify-center">
                    <img
                        src="/third_section.png"
                        alt="Success Stories"
                        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full drop-shadow-lg"
                    />
                </div>
                <div className="lg:w-1/2 text-center lg:text-left space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-pink-500">
                        Trusted by Millions<br />
                        <span className="text-pink-700">of Happy Couples</span>
                    </h1>
                    <p className="text-lg lg:text-xl opacity-90 text-gray-700">
                        We take pride in bringing people together. Your perfect match is just a few clicks away!
                    </p>

                    <div className="mt-6">
                        <Link to="/auth" className="bg-pink-500 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HomeScreen;
