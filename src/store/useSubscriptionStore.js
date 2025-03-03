import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useSubscriptionStore = create((set) => ({
    subscription: null,
    loading: false,

    // Get subscription expiry by user ID
    getSubscriptionExpiry: async (userId) => {
        console.log("Fetching subscription expiry for user id:", userId);
        try {
            set({ loading: true });
            const res = await axiosInstance.get(`/subscription/${userId}`);
            console.log("the expiry date is", res.data)
            set({ subscription: res.data });
        } catch (error) {
            console.error("Error fetching subscription:", error);
            set({ subscription: null });
        } finally {
            set({ loading: false });
        }
    },

    // Save/Create a subscription
    saveSubscription: async (subscriptionData) => {
        console.log("Saving subscription data:", subscriptionData);
        try {
            set({ loading: true });
            const res = await axiosInstance.post("/subscription", subscriptionData);
            set({ subscription: res.data.subscription });
        } catch (error) {
            console.error("Error saving subscription:", error);
        } finally {
            set({ loading: false });
        }
    },
}));
