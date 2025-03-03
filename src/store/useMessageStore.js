// src/store/useMessageStore.js
import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { getSocket } from "../socket/socket.client";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set) => ({
	messages: [],
	loading: true,

	sendMessage: async (receiverId, content) => {
		try {
			set((state) => ({
				messages: [
					...state.messages,
					{ _id: Date.now(), sender: useAuthStore.getState().authUser._id, content },
				],
			}));
			const res = await axiosInstance.post("/messages/send", { receiverId, content });
			console.log("message sent", res.data);
			// Optionally update the message with the server's _id
			set((state) => {
				const updatedMessages = state.messages.map((msg) =>
					msg._id === Date.now() ? { ...msg, _id: res.data.message._id } : msg
				);
				return { messages: updatedMessages };
			});
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		}
	},

	getMessages: async (userId) => {
		try {
			set({ loading: true, messages: [] }); // Clear messages before fetching
			const res = await axiosInstance.get(`/messages/conversation/${userId}`);
			set({ messages: res.data.messages });
		} catch (error) {
			console.log(error);
			set({ messages: [] });
		} finally {
			set({ loading: false });
		}
	},

	subscribeToMessages: (currentMatchId) => {
		const socket = getSocket();
		socket.on("newMessage", ({ message }) => {
			// Only add message if it belongs to the current match
			if (message.sender === currentMatchId || message.receiver === currentMatchId) {
				set((state) => ({ messages: [...state.messages, message] }));
			}
		});
	},

	unsubscribeFromMessages: () => {
		const socket = getSocket();
		socket.off("newMessage");
	},
}));