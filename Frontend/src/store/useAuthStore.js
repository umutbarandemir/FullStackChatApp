import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningIn: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axiosInstance.get('/auth/check'); // Check authentication status, baseURL: 'http://localhost:5001/api' is the base
            set({ authUser: response.data.user, isCheckingAuth: false });
        } catch (error) {
            console.error('Error checking authentication:', error);
            set({ authUser: null, isCheckingAuth: false });
        }
    }
}));

