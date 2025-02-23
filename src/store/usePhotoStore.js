import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


export const usePhotoStore = create((set) => ({
    photos: [],
    loading: true,
    matchPhotos: [],



    getPhotos: async (userId) => {
        console.log("the id being sent", userId);

        try {
            set({ loading: true });
            const res = await axiosInstance.get(`/photos/${userId}`);
            set({ photos: res });
        } catch (error) {
            console.log(error);
            set({ photos: [] });
        } finally {
            set({ loading: false });
        }
    },

    getMatchPhotos: async (userId) => {
        console.log("the id being sent", userId);

        try {
            set({ loading: true });
            const res = await axiosInstance.get(`/photos/${userId}`);
            set({ matchPhotos: res });
        } catch (error) {
            console.log(error);
            set({ matchPhotos: [] });
        } finally {
            set({ loading: false });
        }
    },

    addPhotos: async (userId, image) => {
        console.log("The ID being sent:", userId);
        console.log("The image being sent:", image);

        try {
            set({ loading: true });
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("userPhoto", image);

            const res1 = await axiosInstance.post(`/photos/uploadPhoto`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("after uploading image res ", res1.data.data);
            const res = await axiosInstance.post(`/photos`, {
                userId: userId,
                image: res1.data.data,
            });

            return res.data;

        } catch (error) {
            console.error("Error adding photo:", error);
        }
    },



}));
