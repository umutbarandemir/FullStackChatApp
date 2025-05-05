import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5001'; // Replace with your socket server URL

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: false,
    socket: null,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axiosInstance.get('/auth/check'); // Check authentication status, baseURL: 'http://localhost:5001/api' is the base
            set({ authUser: response.data.user, isCheckingAuth: false }); // Set the authenticated user in the store, try { authUser: response.data}
            get().connectSocket(); // Connect to socket after successful authentication check
        } catch (error) {
            console.error('Error checking authentication:', error);
            set({ authUser: null, isCheckingAuth: false });
        }
    },

    signup : async (userData) => {
        set({ isSigningIn: true });
        try {
            const response = await axiosInstance.post('/auth/signup', userData); // baseURL: 'http://localhost:5001/api' is the base
            toast.success('Account created successfully!');
            set({ authUser: response.data.user, isSigningIn: false }); // response.data

            get().connectSocket(); // Connect to socket after successful signup
        } catch (error) {
            toast.error('Error signing up. Please try again.');
            console.error('Error signing up:', error);
            set({ isSigningIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout'); // baseURL: 'http://localhost:5001/api' is the base
            set({ authUser: null });
            toast.success('Logged out successfully!');

            get().disconnectSocket(); // Disconnect from socket after logout
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Error logging out. Please try again.', error);
        }
    },

    login: async (userData) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', userData); // baseURL: 'http://localhost:5001/api' is the base
            set({ authUser: response.data.user, isLoggingIn: false }); // response.data
            toast.success('Logged in successfully!');

            get().connectSocket(); // Connect to socket after successful login
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Error logging in. Please try again.');
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (userData) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.put('/auth/update-profile', userData); // baseURL: 'http://localhost:5001/api' is the base
            set({ authUser: response.data.user, isUpdatingProfile: false }); // response.data
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error updating profile. Please try again.');
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {

        const { authUser } = get(); // Get the current authenticated user from the store
        if (!authUser || get().socket?.connected ) return; // If not authenticated or already connected, do nothing

        const socket = io(SOCKET_URL,{
            query: { userId: authUser._id }, // Pass the userId as a query parameter to the socket server
        });
        socket.connect(); // Connect to the socket server

        set({ socket:socket }); // Store the socket instance in the store

        socket.on("onlineUsers" , (users) => { // Listen for the onlineUsers event from the server
            set({ onlineUsers: users }); // Update the onlineUsers state in the store
        }); 
    },

    disconnectSocket: () => {
        if(get().socket?.connected) {
            get().socket.disconnect(); // Disconnect the socket if disconnected
            set({ socket: null }); // Clear the socket instance from the store
        }
    },

    
}));

