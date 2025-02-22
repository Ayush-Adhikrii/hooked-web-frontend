import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set) => ({
	authUser: null,
	checkingAuth: true,
	loading: false,
	userDetails: null,
	matchDetails:null,

	signup: async (signupData) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.post("/auth/signup", signupData);
			console.log("this is res data user");
			console.log(res.data.user);
			set({ authUser: res.data.user });
			initializeSocket(res.data.user._id);


			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},
	login: async (loginData) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.post("/auth/login", loginData);
			set({ authUser: res.data.user });
			initializeSocket(res.data.user._id);
			toast.success("Logged in successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},
	logout: async () => {
		try {
			const res = await axiosInstance.post("/auth/logout");
			disconnectSocket();
			if (res.status === 200) set({ authUser: null });
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		}
	},

	uploadImage: async (image) => {
		try {
			set({ loading: true });

			// Create a FormData object and append the image
			const formData = new FormData();
			formData.append("profilePicture", image);  // "profilePhoto" is the field name expected by your backend

			// Make the request with the correct headers and FormData
			const res = await axiosInstance.post("/auth/uploadImage", formData, {
				headers: {
					"Content-Type": "multipart/form-data",  // Ensure it's set for file uploads
				},
			});


			return res.data;
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/auth/me");
			initializeSocket(res.data.user._id);
			set({ authUser: res.data.user });
		} catch (error) {
			set({ authUser: null });
			console.log(error);
		} finally {
			set({ checkingAuth: false });
		}
	},

	setAuthUser: (user) => set({ authUser: user }),

	updateProfile: async (updateData) => {
		const authUser = useAuthStore.getState().authUser;
		console.log("this is update prodile");
		console.log("this is the user id", authUser._id);
		try {

			// Check if authUser exists
			if (!authUser || !authUser._id) {
				throw new Error("User is not authenticated or _id is missing");
			}

			set({ loading: true });

			// Use the user _id for the API request
			const res = await axiosInstance.put(`/auth/update/${authUser._id}`, updateData);

			// Log the response to ensure it's as expected
			console.log("Update Profile Response:", res);

			set({ authUser: res.data.user });
			toast.success("Profile updated successfully");
		} catch (error) {
			// Log the error and show a proper error message
			console.error("Update Profile Error:", error);
			const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
			toast.error(errorMessage);
		} finally {
			set({ loading: false });
		}
	},

	getUserDetails: async () => {

		const authUser = useAuthStore.getState().authUser;
		try {
			set({ loading: true });
			const res = await axiosInstance.get(`/userDetails/user/${authUser._id}`);
			if (res.status == 404) {
				console.log("not found vayo ni tw feri");
			}
			set({ userDetails: res.data });
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},

	getMatchDetails: async (uId) => {

		try {
			set({ loading: true });
			const res = await axiosInstance.get(`/userDetails/user/${uId}`);
			if (res.status == 404) {
				console.log("not found vayo ni tw feri");
			}
			set({ matchDetails: res.data });
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},


	updateDetail: async (updateData) => {
		const authUser = useAuthStore.getState().authUser;
		console.log("this is update detail");
		console.log("this is the user id", authUser._id);
		try {

			// Check if authUser exists
			if (!authUser || !authUser._id) {
				throw new Error("User is not authenticated or _id is missing");
			}

			set({ loading: true });

			// Use the user _id for the API request
			const res = await axiosInstance.put(`/userDetails/${authUser._id}`, updateData);

			// Log the response to ensure it's as expected
			console.log("Update Profile Response:", res);

			toast.success("Details updated successfully");
		} catch (error) {
			// Log the error and show a proper error message
			console.error("Update Profile Error:", error);
			const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
			toast.error(errorMessage);
		} finally {
			set({ loading: false });
		}
	},

	checkPassword: async (userId, password) => {
		console.log("inside check pw");
		try {
			const response = await axios.post('auth/checkPassword', {
				userId,
				password
			});
			console.log("check password console",response.data);
			return response.data;
		} catch (error) {
			if (error.response) {
				return { success: false, message: error.response.data.message };
			} else if (error.request) {
				return { success: false, message: 'No response from server' };
			} else {
				return { success: false, message: 'Error setting up request' };
			}
		}
	}





}));
