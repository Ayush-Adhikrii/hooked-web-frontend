import { Baby, Book, Briefcase, ChevronRight, Cigarette, Dumbbell, Edit2, GraduationCap, LogOut, Plus, Ruler, Wine } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import EditFieldModal from "../components/EditFieldModal";
import { useAuthStore } from "../store/useAuthStore";
import { getAge } from "../store/useDateStore";
import { usePhotoStore } from '../store/usePhotoStore';




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



const ProfileArea = () => {
    const { authUser, getUserDetails, checkPassword, logout, updateDetail, userDetails, updateProfile } = useAuthStore();
    const { photos, getPhotos, addPhotos } = usePhotoStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [activeField, setActiveField] = useState(null);
    var pictures;

    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Function to handle the password change submission
    const handleChangePassword = async () => {
        console.log("handle change pw");
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            const result = await checkPassword(authUser._id, oldPassword);
            console.log("Password validation result:", result);

            if (result.success) {
                updateProfile({ "password": newPassword });
            }
        } catch (error) {
            setError("Invalid old password");
            console.error("Password check failed:", error);
        }

        // Reset fields
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        setIsChangingPassword(false); // Close password change form
    };


    // getUserDetails();
    console.log("auth user", authUser);

    useEffect(() => {
        getUserDetails();
        getPhotos(authUser._id);
    }, [getUserDetails, getPhotos]);

    if (photos.data) {
        pictures = photos.data;
    } else {
        pictures = [null, null, null];
    }

    console.log("all the photos are", photos.data);


    // Function to open modal for a specific field
    const handleOpenModal = (field) => {
        setActiveField(field);
        setModalOpen(true);
    };

    // Function to update a field
    const handleSaveField = async (field, newValue) => {
        await updateDetail({ [field]: newValue });
        getUserDetails(); // Refresh user details after updating
    };

    const handleHover = () => {
        setIsHovered(true);
    };
    const fileInputRef = useRef(null);

    const handleImageUpload = async (event) => {
        console.log("add photos clicked")
        const file = event.target.files[0];
        if (file) {
            try {
                // Upload image file directly
                const res = await addPhotos(authUser._id, file);
                console.log("response of impage upload", res);
                getPhotos(authUser._id);


            } catch (error) {
                console.error("Error adding image:", error);
            }
        }
    }

    return (
        <div className='relative w-full max-w-sm h-[28rem]'>


            <div
                className='card bg-pink-150 w-auto h-[28rem] select-none rounded-lg overflow-hidden border border-gray-100'
            >
                <div
                    className=' overflow-y-auto card bg-pink-200 w-auto h-[28rem] select-none rounded-lg border  border-gray-200'
                >
                    {/* Add overflow-y-auto to enable scrolling */}
                    <div className=" h-full pb-5">
                        <div className="flex items-center justify-center mt-5 ">

                            <div className="w-11/12 bg-pink-400 mt-2 mb-5 rounded-lg">
                                <div className="grid grid-cols-3 gap-2 mt-2 mb-2 ml-2 mr-2">
                                    {/* First Card (spans 2 rows and 2 columns) */}
                                    <div className="col-span-2 row-span-2 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <img
                                            src={`/profilePhotos/${authUser.profilePhoto}`}
                                            alt="Card 1"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    {/* Second Card */}
                                    <div className="bg-pink-300 rounded-lg flex items-center justify-center">

                                        <img
                                            src={pictures[0] ? `/userImages/${pictures[0]}` : undefined}
                                            alt="User Photo"
                                            className={`w-full h-full object-cover rounded-lg ${pictures[0] ? "" : "hidden"}`}
                                        />

                                        {!pictures[0] && (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                                                <Plus className="w-10 h-10 text-gray-500" />
                                            </div>
                                        )}


                                    </div>
                                    {/* Third Card */}
                                    <div className="bg-pink-300 rounded-lg flex items-center justify-center">
                                        <img
                                            src={pictures[1] ? `/userImages/${pictures[1]}` : undefined}
                                            alt="User Photo"
                                            className={`w-full h-full object-cover rounded-lg ${pictures[1] ? "" : "hidden"}`}
                                        />

                                        {!pictures[1] && (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                                                <Plus className="w-10 h-10 text-gray-500" />
                                            </div>
                                        )}

                                    </div>
                                    {/* Fourth Card */}
                                    <div className="bg-pink-300 rounded-lg flex items-center justify-center">
                                        <img
                                            src={pictures[2] ? `/userImages/${pictures[2]}` : undefined}
                                            alt="User Photo"
                                            className={`w-full h-full object-cover rounded-lg ${pictures[2] ? "" : "hidden"}`}
                                        />

                                        {!pictures[2] && (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                                                <Plus className="w-10 h-10 text-gray-500" />
                                            </div>
                                        )}

                                    </div>
                                    {/* Fifth Card */}
                                    <div className="bg-pink-300 rounded-lg flex items-center justify-center">
                                        <img
                                            src={pictures[3] ? `/userImages/${pictures[3]}` : undefined}
                                            alt="User Photo"
                                            className={`w-full h-full object-cover rounded-lg ${pictures[3] ? "" : "hidden"}`}
                                        />

                                        {!pictures[3] && (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                                                <Plus className="w-10 h-10 text-gray-500" />
                                            </div>
                                        )}

                                    </div>
                                    {/* Sixth Card */}
                                    <div className="bg-transparent rounded-lg flex items-center justify-center">
                                        <img
                                            src="/icons/white_logo.png"
                                            alt="Card 6"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex items-center justify-center ">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleImageUpload}
                            />

                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="w-11/12 flex justify-center mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                                Add Photos
                            </button>

                        </div>
                        <div className="flex items-center justify-center mt-2  mb-10 bg-pink">
                            <div className="bg-pink-300 shadow-md rounded-lg p-4 w-11/12 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold">{authUser.name}, {getAge(authUser.birthDate)}</h2>
                                    <p className="text-gray-600 text-sm">
                                        <sub>{authUser.gender}, {authUser.starSign}</sub>
                                    </p>
                                </div>
                                <Link to="/details" className="text-pink-600 hover:text-pink-800">
                                    <Edit2 size={24} /> {/* Edit icon */}
                                </Link>
                            </div>
                        </div>

                        {/* Additional info */}
                        <div className=" pl-5 flex items-start justify-start ">
                            <p className="text-gray-600 text-sm">
                                <sub>
                                    Additional Info
                                </sub>
                            </p>
                        </div>



                        <div>
                            {fields.map(({ key, label, icon: Icon, unit }) => (
                                <div key={key} className="flex items-center justify-center mt-2 mb-2 bg-pink">
                                    <div className="bg-pink-300 shadow-md rounded-lg p-4 w-11/12 flex justify-between items-center">

                                        {/* Left Section: Icon & Label */}
                                        <div className="flex items-center gap-2">
                                            <Icon size={20} className="text-gray-700" />
                                            <span className="text-lg font-medium text-gray-800">{label}</span>
                                        </div>

                                        {/* Right Section: Value & Edit Button */}
                                        <button onClick={() => handleOpenModal({ key, label, icon: Icon, unit })} className="flex items-center gap-1 text-black">
                                            <span>
                                                {typeof userDetails?.[key] === "string" && userDetails[key].trim()
                                                    ? `${userDetails[key]}${unit || ""}`
                                                    : userDetails?.[key] || "Add"}
                                            </span>

                                            <ChevronRight className="text-pink-600 hover:text-pink-800" size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Modal (Dynamic for all fields) */}
                            {activeField && (
                                <EditFieldModal
                                    isOpen={modalOpen}
                                    onClose={() => setModalOpen(false)}
                                    onSave={handleSaveField}
                                    field={activeField.key}
                                    icon={activeField.icon}
                                    title={activeField.label}
                                    currentValue={userDetails?.[activeField.key]}
                                    unit={activeField.unit}
                                />
                            )}
                        </div>

                        {/* Security */}

                        <div className="flex items-start justify-start pl-5 mb-4">
                            <p className="text-red-600 text-sm">
                                <sub>Security</sub>
                            </p>
                        </div>

                        {/* If not changing password, show Log Out button */}
                        {!isChangingPassword ? (
                            <div className="flex items-center justify-center">
                                {/* Log Out button */}

                            </div>
                        ) : (
                            // If changing password, show the password fields and Save button
                            <div className=" w-11/12 flex flex-col ml-7 justify-center items-center">
                                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                                <div className="w-11/12 mb-3 mr-6">
                                    <label htmlFor="old-password" className="block text-sm font-medium text-gray-700">
                                        Old Password
                                    </label>
                                    <input
                                        type="password"
                                        id="old-password"
                                        placeholder="Enter your old password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>
                                <div className="w-11/12 mr-6 mb-3">
                                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="new-password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>
                                <div className="w-11/12 mb-3 mr-6">
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                </div>

                                <div className="flex items-center justify-center space-x-4 w-10/12">
                                    {oldPassword || newPassword || confirmPassword ? (
                                        // Save Password button
                                        <button
                                            onClick={handleChangePassword}
                                            className="w-full py-3 px-5 rounded-lg shadow-md text-base font-semibold text-white  bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                        >
                                            Save Password
                                        </button>
                                    ) : (
                                        // Cancel button when fields are empty
                                        <button
                                            onClick={() => setIsChangingPassword(false)} // Reset to initial state (not changing password)
                                            className="w-full py-3 mr-5 rounded-lg shadow-md text-base font-semibold text-red-700   bg-pink-300 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                        >
                                            Cancel
                                        </button>
                                    )}

                                    {/* Cancel Button for non-empty fields */}
                                    {oldPassword || newPassword || confirmPassword ? (
                                        <div> </div>
                                    ) : null}
                                </div>
                            </div>
                        )}

                        {/* Option to toggle password change */}
                        {!isChangingPassword && (
                            <div className="flex items-center justify-center mt-3">
                                <button
                                    onClick={() => setIsChangingPassword(true)}
                                    className="w-11/12 flex items-center justify-center gap-3 mt-2 ml-2 py-3 rounded-lg shadow-md text-base font-semibold text-white  bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                    Change Password
                                </button>
                            </div>
                        )}

                        {/* Logout */}
                        <button
                            onClick={logout}
                            className="w-11/12 flex items-center justify-center gap-3 mt-2 ml-5  py-3 px-5 rounded-lg shadow-md text-base font-semibold text-white bg-gradient-to-r from-pink-700 to-red-600 hover:from-red-600 hover:to-red-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                        >
                            <LogOut size={22} className="text-white" />
                            <span>Log Out</span>
                        </button>
                        <div className="flex items-center h-2 justify-center mt-5 ">



                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default ProfileArea;
