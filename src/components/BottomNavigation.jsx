import { Filter, Heart, HomeIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNavigation = () => {
    const location = useLocation();

    return (
        <header className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Likes Button */}
                    <NavItem to="/likes" icon={Heart} active={location.pathname === "/likes"} />

                    {/* Home Button */}
                    <NavItem to="/" icon={HomeIcon} active={location.pathname === "/"} />

                    {/* Filter Button */}
                    <NavItem to="/filter" icon={Filter} active={location.pathname === "/filter"} />
                </div>
            </div>
        </header>
    );
};

// Reusable navigation item component
const NavItem = ({ to, icon: Icon, active }) => {
    return (
        <Link to={to} className="flex items-center space-x-2">
            <div className="flex items-center p-2 rounded-lg transition-all duration-300">
                <Icon className={`w-6 h-6 ${active ? "fill-current text-white" : "stroke-white"}`} />
            </div>
        </Link>
    );
};
