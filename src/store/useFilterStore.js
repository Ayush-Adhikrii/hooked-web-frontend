import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


export const useFilterStore = create((set) => ({
    preference: null,
    loading: true,

    getPreference: async (userId) => {
        console.log("the id being sent", userId);

        try {
            set({ loading: true });
            const res = await axiosInstance.get(`/preference/${userId}`);
            set({ preference: res.data });
        } catch (error) {
            console.log(error);
            set({ preference: [] });
        } finally {
            set({ loading: false });
        }
    },


    updatePreference: async (userId, updateData) => {
        console.log("Updating preference for user id", userId);
        try {
            set({ loading: true });
            const res = await axiosInstance.put(`/preference/${userId}`, updateData);
            set({ preference: res.data });
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },

}));
