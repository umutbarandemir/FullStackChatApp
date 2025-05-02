import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useChatStore = create((set) => ({
    texts:[],
    users:[],
    selectedUser: null,
    isUsersLoading: false,
    isTextsLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get('/text/users'); // baseURL: 'http://localhost:5001/api' is the base
            set({ users: response.data, isUsersLoading: false }); // Set the authenticated user in the store, this needs to be an array of users, that's why we get it as response.data instead of response.data.user
        } catch (error) {
            console.error('Error checking authentication:', error);
            toast.error('Error fetching users. Please try again.');
            set({ users: [], isUsersLoading: false });
        }
    },

    getTexts: async (userId) => {
        set({ isTextsLoading: true });
        try {
            const response = await axiosInstance.get(`/text/${userId}`); // baseURL: 'http://localhost:5001/api' is the base
            set({ texts: response.data, isTextsLoading: false }); // Set the authenticated user in the store, this needs to be an array of users, that's why we get it as response.data instead of response.data.user
        } catch (error) {
            console.error('Error checking authentication:', error);
            toast.error('Error fetching texts. Please try again.');
            set({ texts: [], isTextsLoading: false });
        }
    },

    setSelectedUser: (user) => set({ selectedUser: user }),
}));