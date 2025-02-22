import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";

export const BottomNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const { authUser, logout } = useAuthStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();
    const [page, setPage] = useState("message");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        // getMyMatches();
    }, [getMyMatches]);

    return (
        <>
            <header className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-lg">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">


                        {/* Other navigation items */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="flex items-center p-2 rounded-lg transition-colors duration-300">
                                    <img
                                        src={
                                            page === "likes"
                                                ? "/icons/likes_solid.png"
                                                : "/icons/likes_outline.png"
                                        }
                                        alt="Likes"
                                        className="w-6 h-6"
                                    />
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="flex items-center p-2 rounded-lg transition-colors duration-300">
                                    <img
                                        src="/icons/message_solid.png" // adjust as needed
                                        alt="Home"
                                        className="w-6 h-6"
                                    />
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="flex items-center p-2 rounded-lg transition-colors duration-300">
                                    <img
                                        src={
                                            page === "filter"
                                                ? "/icons/filter_solid.png"
                                                : "/icons/filter_outline.png"
                                        }
                                        alt="Filter"
                                        className="w-6 h-6"
                                    />
                                </div>
                            </Link>
                        </div>


                    </div>
                </div>
            </header>

            {/* Conditionally render the Sidebar */}
            {isOpen && <Sidebar />}

            {/* Optionally, render a button for mobile to toggle sidebar */}

        </>
    );
};
