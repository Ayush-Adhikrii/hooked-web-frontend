import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthStore } from "../store/useAuthStore";
import { getStarSign } from "../store/useDateStore";

const UpdateProfile = () => {
    const { authUser, updateProfile, getUserDetails, uploadImage } = useAuthStore();




    // State for user fields
    const [name, setName] = useState(authUser?.name || "");
    const [gender, setGender] = useState(authUser?.gender || "");
    const [email, setEmail] = useState(authUser?.email || "");
    const [birthDate, setBirthDate] = useState(authUser?.birthDate ? new Date(authUser.birthDate) : null);
    const [starSign, setStarSign] = useState(authUser?.starSign || "");
    const [phoneNumber, setPhoneNumber] = useState(authUser?.phoneNumber || "");
    const [bio, setBio] = useState(authUser?.bio || "");
    const [userName, setUserName] = useState(authUser?.userName || "");
    const [password, setPassword] = useState(authUser?.password || "");
    const [profilePhoto, setProfilePhoto] = useState(authUser?.profilePhoto || "/default_profile.png");

    // Min and max dates for age limit (16 to 60)
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());



    useEffect(() => {
        if (birthDate) {
            setStarSign(getStarSign(birthDate));
        }
    }, [birthDate]);

    useEffect(() => {
        getUserDetails();
    }, [getUserDetails]);



    // Handle profile image selection
    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            name,
            gender,
            email,
            birthDate,
            starSign,
            bio,
            phoneNumber,
            userName,
            profilePhoto,
        };
        updateProfile(updatedData);
        if (profilePhoto !== authUser.profilePhoto) {
            uploadImage(profilePhoto);
        }
    };



    return (
        <div className="flex justify-center overflow-y-auto items-center max-h-screen/3 w-3/7 bg-transparent pt-16">
            <form className="relative space-y-6  bg-pink-200 shadow-lg rounded-xl p-8 w-full max-h-screen/3" onSubmit={handleSubmit}>
                {/* PROFILE PHOTO */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <label htmlFor="profilePhoto" className="cursor-pointer">
                        <img
                            src={`/profilePhotos/${profilePhoto}` || "/default_profile.png"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                        />
                    </label>
                    <input type="file" id="profilePhoto" accept="image/*" className="hidden" onChange={handleProfileChange} />
                </div>
                <div
                    className=' overflow-y-auto card bg-pink-200  h-[28rem] select-none rounded-lg w-max'
                >

                    {/* NAME */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
                        />
                    </div>

                    {/* GENDER */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Gender</label>
                        <div className="flex justify-center gap-4 mt-2">
                            {["Male", "Female", "Other"].map((g) => (
                                <label key={g} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        onChange={() => setGender(g)}
                                        className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                                    />
                                    <span className="ml-2 text-gray-900">{g}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
                        />
                    </div>

                    {/* BIRTH DATE */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Birth Date</label>
                        <DatePicker
                            selected={birthDate}
                            onChange={(date) => setBirthDate(date)}
                            dateFormat="MM/dd/yyyy"
                            className="w-full px-3 py-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </div>

                    {/* STAR SIGN (Read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Star Sign</label>
                        <input type="text" readOnly value={starSign} className="w-full px-3 py-2 border bg-gray-100 rounded-md" />
                    </div>

                    {/* PHONE NUMBER */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
                        />
                    </div>

                    {/* BIO */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            required
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
                        ></textarea>
                    </div>

                    {/* USERNAME */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
                        />
                    </div>

                    {/* PASSWORD (UNMASKED) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:ring-pink-500 focus:border-pink-500"
                        />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button type="submit" className="w-full py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700">
                        Update Profile
                    </button>

                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
