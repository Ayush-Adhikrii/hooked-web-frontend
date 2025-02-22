import { Baby, Book, Briefcase, Cigarette, Dumbbell, GraduationCap, Ruler, Wine } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { usePhotoStore } from "../store/usePhotoStore";

const fields = [
    { key: "profession", label: "Work", icon: Briefcase },
    { key: "height", label: "Height", icon: Ruler, unit: "cm" },
    { key: "education", label: "Education", icon: GraduationCap },
    { key: "exercise", label: "Exercise", icon: Dumbbell },
    { key: "drinks", label: "Drinks", icon: Wine },
    { key: "smoke", label: "Smoke", icon: Cigarette },
    { key: "kids", label: "Kids", icon: Baby },
    { key: "religion", label: "Religion", icon: Book },
];

const UserPopupProfile = ({ user, onClose }) => {
    const { getMatchDetails, matchDetails } = useAuthStore();
    const { getMatchPhotos, matchPhotos } = usePhotoStore();
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        if (user) {
            getMatchDetails(user._id);
            getMatchPhotos(user._id);
        }
    }, [user, getMatchDetails, getMatchPhotos]);

    useEffect(() => {
        if (matchPhotos?.data) {
            setPictures(matchPhotos.data.slice(0, 4)); // Get first 4 photos
        }
    }, [matchPhotos]);

    // Swap images when clicking on a smaller image
    const swapImages = (index) => {
        if (pictures.length < 2) return; // No swapping if there are less than 2 images
        const newPictures = [...pictures];
        [newPictures[0], newPictures[index]] = [newPictures[index], newPictures[0]]; // Swap main image with clicked one
        setPictures(newPictures);
    };

    if (!user) return null; // Ensure user exists before rendering

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {/* Two-Popup Layout */}
            <div className="flex gap-4 bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">

                {/* Close Button */}
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
                    ✕
                </button>

                {/* Left Column: Bigger Profile Picture */}
                <div className="w-1/2 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-800 text-center">{user.name}</h2>

                    {/* Larger Main Profile Image */}
                    <div className="w-full h-64 rounded-md overflow-hidden border border-gray-300 mt-2">
                        <img
                            src={pictures[0] ? `/userImages/${pictures[0]}` : "/avatar.png"}
                            alt="Main Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Smaller Secondary Images (Clickable to Swap) */}
                    <div className="grid grid-cols-3 gap-2 mt-3">
                        {pictures.slice(1, 4).map((photo, index) => (
                            <img
                                key={index}
                                src={photo ? `/userImages/${photo}` : "/avatar.png"}
                                alt={`Photo ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-md border cursor-pointer hover:opacity-80 transition"
                                onClick={() => swapImages(index + 1)} // Swap when clicked
                            />
                        ))}
                    </div>
                </div>

                {/* Right Column: User Details */}
                <div className="w-1/2">
                    <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">Details</h3>
                    <div className="space-y-2">
                        {fields.map(({ key, label, icon: Icon, unit }) => (
                            <div key={key} className="flex items-center justify-between bg-pink-100 p-2 rounded-md">
                                {/* Left: Icon & Label */}
                                <div className="flex items-center gap-2">
                                    <Icon size={18} className="text-gray-700" />
                                    <span className="text-sm font-medium text-gray-800">{label}</span>
                                </div>

                                {/* Right: Read-Only Value */}
                                <span className="text-sm text-black">
                                    {matchDetails?.[key] ? `${matchDetails[key]}${unit || ""}` : "N/A"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserPopupProfile;
