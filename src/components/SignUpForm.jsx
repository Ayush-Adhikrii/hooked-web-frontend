import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthStore } from "../store/useAuthStore";


const SignUpForm = () => {
	var photoName = "";
	var photoURL = "";
	const [name, setName] = useState("");
	const [gender, setGender] = useState("");
	const [email, setEmail] = useState("");
	const [birthDate, setBirthDate] = useState(null);
	const [starSign, setStarSign] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [bio, setBio] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [profilePhoto, setProfilePhoto] = useState(null);

	const { uploadImage, signup, loading } = useAuthStore();

	// Calculate min and max dates for age between 16 and 60
	const today = new Date();
	const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
	const minDate = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());

	// Function to calculate star sign based on birth date
	const getStarSign = (date) => {
		if (!date) return "";
		const month = date.getMonth() + 1;
		const day = date.getDate();
		if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
		if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
		if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
		if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
		if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
		if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
		if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
		if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
		if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
		if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
		if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
		if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
		return "";
	};


	useEffect(() => {
		if (birthDate) {
			setStarSign(getStarSign(birthDate));
		}
	}, [birthDate]);

	const handleProfileChange = async (event) => {
		const file = event.target.files[0];
		if (file) {
			try {
				// Upload image file directly
				const res = await uploadImage(file);

				// Assuming the response contains the filename
				if (res && res.data && res.data) {
					console.log("Uploaded image:", res.data);
					setProfilePhoto(res.data);
					var photoName = res.data;
					photoURL = `/profilePhotos/${res.data}`;

					console.log("photo name", photoName);
					console.log("photo url", photoURL);

				}
			} catch (error) {
				console.error("Error uploading image:", error);
			}
		}
	};



	const handleSubmit = (e) => {
		e.preventDefault();

		const signupData = {
			name,
			gender,
			email,
			birthDate,
			starSign,
			bio,
			phoneNumber,
			userName,
			password,
			profilePhoto,
		};

		signup(signupData);
	};


	return (
		<div className="relative flex justify-center bg-transparent">
			<form className="space-y-6 border bg-white  mb-0 p-8  w-full max-w-md relative pt-16 rounded-t-lg" onSubmit={handleSubmit}>
				{/* PROFILE PHOTO */}
				<div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
					<label htmlFor="profilePhoto" className="cursor-pointer relative">
						<img
							src={profilePhoto ? `/profilePhotos/${profilePhoto}` : "/default_profile.png"}


							alt="Profile"
							className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
						/>
					</label>
					<input
						type="file"
						id="profilePhoto"
						accept="image/*"
						className="hidden"
						onChange={handleProfileChange}
					/>
				</div>

				{/* NAME */}
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-700">
						Name
					</label>
					<div className="mt-1">
						<input
							id="name"
							name="name"
							type="text"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
						/>
					</div>
				</div>

				{/* GENDER */}
				<div>
					<label className="block text-sm font-medium text-gray-700">Your Gender</label>
					<div className="mt-2 flex gap-2">
						<div className="flex items-center">

							<input
								id="Male"
								name="gender"
								type="radio"
								checked={gender === "Male"}
								onChange={() => setGender("Male")}
								className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
							/>
							<label htmlFor="Male" className="ml-2 block text-sm text-gray-900 peer-checked:text-pink-600">
								Male
							</label>
						</div>
						<div className="flex items-center">
							<input
								id="Female"
								name="gender"
								type="radio"
								checked={gender === "Female"}
								onChange={() => setGender("Female")}
								className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
							/>
							<label htmlFor="Female" className="ml-2 block text-sm text-gray-900 peer-checked:text-pink-600">
								Female
							</label>
						</div>

						<div className="flex items-center">
							<input
								id="Other"
								name="gender"
								type="radio"
								checked={gender === "Other"}
								onChange={() => setGender("Other")}
								className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
							/>
							<label htmlFor="Other" className="ml-2 block text-sm text-gray-900 peer-checked:text-pink-600">
								Other
							</label>
						</div>
					</div>
				</div>

				{/* EMAIL */}
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">
						Email address
					</label>
					<div className="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
						/>
					</div>
				</div>

				{/* BIRTH DATE */}
				<div>
					<label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
						Birth Date
					</label>
					<div className="mt-1">
						<DatePicker
							id="birthDate"
							name="birthDate"
							selected={birthDate}
							onChange={(date) => setBirthDate(date)}
							dateFormat="MM/dd/yyyy"
							placeholderText="Select your birth date"
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
							minDate={minDate}
							maxDate={maxDate}
						/>
					</div>
				</div>


				{/* STAR SIGN (Read-only) */}
				<div>
					<label htmlFor="starSign" className="block text-sm font-medium text-gray-700">
						Star Sign
					</label>
					<div className="mt-1">
						<input
							id="starSign"
							name="starSign"
							type="text"
							readOnly
							value={starSign}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-gray-100 sm:text-sm"
						/>
					</div>
				</div>

				{/* PHONE NUMBER */}
				<div>
					<label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
						Phone Number
					</label>
					<div className="mt-1">
						<input
							id="phoneNumber"
							name="phoneNumber"
							type="text"
							required
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
						/>
					</div>
				</div>

				{/* BIO */}
				<div>
					<label htmlFor="bio" className="block text-sm font-medium text-gray-700">
						Bio
					</label>
					<div className="mt-1">
						<textarea
							id="bio"
							name="bio"
							required
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
						></textarea>
					</div>
				</div>

				{/* USERNAME */}
				<div>
					<label htmlFor="userName" className="block text-sm font-medium text-gray-700">
						Username
					</label>
					<div className="mt-1">
						<input
							id="userName"
							name="userName"
							type="text"
							required
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
						/>
					</div>
				</div>


				{/* PASSWORD */}
				<div>
					<label htmlFor="password" className="block text-sm font-medium text-gray-700">
						Password
					</label>
					<div className="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="new-password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
						/>
					</div>
				</div>




				{/* SUBMIT BUTTON */}
				<div>
					<button
						type="submit"
						className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading
							? "bg-pink-400 cursor-not-allowed"
							: "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
							}`}
						disabled={loading}
					>
						{loading ? "Signing up..." : "Sign up"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;








