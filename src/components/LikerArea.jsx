import { useState } from "react";
import TinderCard from "react-tinder-card";
import { getAge } from "../store/useDateStore";
import { useMatchStore } from "../store/useMatchStore";
import UserPopupProfile from "./UserPopupProfile"; // Import the popup profile component

const LikerArea = () => {
    const { likers, swipeRight, swipeLeft } = useMatchStore();
    const [selectedUser, setSelectedUser] = useState(null); // State for the popup

    const handleSwipe = (dir, user) => {
        if (dir === "right") swipeRight(user);
        else if (dir === "left") swipeLeft(user);
    };

    return (
        <div className="relative w-full max-w-sm h-[28rem]">
            {likers.map((user) => (
                <TinderCard
                    className="absolute shadow-none"
                    key={user._id}
                    onSwipe={(dir) => handleSwipe(dir, user)}
                    swipeRequirementType="position"
                    swipeThreshold={100}
                    preventSwipe={["up", "down"]}
                >
                    {/* Button to Open Popup */}
                    <button onClick={() => setSelectedUser(user)}>
                        <div className="card bg-white w-96 h-[28rem] select-none rounded-lg overflow-hidden border border-gray-200">
                            <figure className="px-4 pt-4 h-3/4">
                                <img
                                    src={user.profilePhoto ? `/profilePhotos/${user.profilePhoto}` : "/avatar.png"}
                                    alt={user.name}
                                    className="rounded-lg object-cover h-full pointer-events-none"
                                />
                            </figure>
                            <div className="card-body bg-gradient-to-b from-white to-pink-50">
                                <h2 className="card-title text-2xl text-gray-800">
                                    {user.name}, {getAge(user.birthDate)}
                                </h2>
                                <p className="text-gray-600">{user.bio}</p>
                            </div>
                        </div>
                    </button>
                </TinderCard>
            ))}

            {/* Show Popup Profile if a User is Clicked */}
            {selectedUser && (
                <UserPopupProfile user={selectedUser} onClose={() => setSelectedUser(null)} />
            )}
        </div>
    );
};

export default LikerArea;
