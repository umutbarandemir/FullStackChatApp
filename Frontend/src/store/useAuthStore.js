import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axiosInstance.get('/auth/check'); // Check authentication status, baseURL: 'http://localhost:5001/api' is the base
            set({ authUser: response.data.user, isCheckingAuth: false }); // Set the authenticated user in the store, try { authUser: response.data}
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
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Error logging in. Please try again.');
            set({ isLoggingIn: false });
        }
    },

    
}));

