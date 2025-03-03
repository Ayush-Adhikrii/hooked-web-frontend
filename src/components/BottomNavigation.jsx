import { Filter, Heart } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const BottomNavigation = () => {
    const location = useLocation();
    const [homeIcon, setHomeIcon] = useState("/icons/white_logo.png");

    const toggleHomeIcon = () => {
        setHomeIcon((prev) =>
            prev === "/icons/white_logo.png" ? "/icons/pink_logo.png" : "/icons/white_logo.png"
        );
    };

    return (
        <header className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Likes Button */}
                    <NavItem to="/likes" icon={Heart} active={location.pathname === "/likes"} />

                    {/* Home Button (Custom Image) */}
                    <NavItem to="/home" icon={homeIcon} active={location.pathname === "/home"} onClick={toggleHomeIcon} />

                    {/* Filter Button */}
                    <NavItem to="/filter" icon={Filter} active={location.pathname === "/filter"} />
                </div>
            </div>
        </header>
    );
};

const NavItem = ({ to, icon, active, onClick }) => {
    return (
        <Link to={to} className="flex items-center space-x-2" onClick={onClick}>
            <div className="flex items-center p-2 rounded-lg transition-all duration-300">
                {typeof icon === "string" ? (
                    <img src={icon} alt="icon" className="w-8 h-8" />
                ) : (
                    React.createElement(icon, {
                        className: `w-6 h-6 ${active ? "text-white" : "text-white opacity-70"}`,
                    })
                )}
            </div>
        </Link>
    );
};
