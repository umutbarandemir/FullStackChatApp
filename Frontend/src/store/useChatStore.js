import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js"; 

export const useChatStore = create((set,get) => ({
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
            set({ isTextsLoading: false });
        }
    },

    sendText: async (data) => {
        const { selectedUser, texts } = get();
        try {
            const response = await axiosInstance.post(`/text/send/${selectedUser._id}`, data); // baseURL: 'http://localhost:5001/api' is the base
            set({ texts: [...texts, response.data] }); // Set the authenticated user in the store, this needs to be an array of users, that's why we get it as response.data instead of response.data.user
        } catch (error) {
            console.error('Error checking authentication:', error);
            toast.error('Error sending text. Please try again.');
        }

    },

    subscribeToNewTexts: () => {
        const selectedUser = get().selectedUser; // Get the selected user from the store

        if (!selectedUser) return; // If no user is selected, do nothing

        const socket = useAuthStore.getState().socket; // Get the socket from the auth store

        socket.on('newText', (newText) => { // Listen for new text events
            set((state) => ({ texts: [...state.texts, newText] })); // Update the texts in the store with the new text
        });

    },

    unsubscribeFromNewTexts: () => { //when logging out or switching users, we need to unsubscribe from the new texts event
        const socket = useAuthStore.getState().socket; // Get the socket from the auth store

        socket.off('newText'); // Remove the listener for new text events
    },

    setSelectedUser: (user) => set({ selectedUser: user }),
}));