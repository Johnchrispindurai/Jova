import { create } from 'zustand';
import type { UserProfile, Order, ShippingAddress, Product } from '../types';
import { useToastStore } from './useToastStore';
import { api } from '../utils/api';

interface PendingCartAction {
  product: Product;
  color: { name: string; hex: string };
  size: string;
  quantity: number;
}

interface UserState {
  user: UserProfile | null;
  orders: Order[];
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  pendingWishlistAction: Product | null;
  setPendingWishlistAction: (product: Product | null) => void;
  pendingCartAction: PendingCartAction | null;
  setPendingCartAction: (action: PendingCartAction | null) => void;
  authStep: 'idle' | 'registerOtp' | 'loginOtp';
  pendingRegisterEmail: string | null;
  pendingLoginEmail: string | null;
  setAuthStep: (step: 'idle' | 'registerOtp' | 'loginOtp') => void;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  verifyRegisterOtp: (email: string, code: string) => Promise<void>;
  resendRegisterOtp: (email: string) => Promise<void>;
  verifyLoginOtp: (email: string, code: string) => Promise<void>;
  resendLoginOtp: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  addOrder: (order: Order) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (address: ShippingAddress) => void;
}

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'JV-89021',
    date: '2026-05-15',
    items: [],
    subtotal: 5499,
    shippingFee: 0,
    totalAmount: 5499,
    shippingAddress: {
      firstName: 'Charlotte',
      lastName: 'Dubois',
      email: 'charlotte.d@jova.com',
      phone: '+1 (555) 019-2834',
      address: '742 Rue de Rivoli',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      deliveryMethod: 'Express Courier'
    },
    paymentMethod: 'Credit Card (Visa •••• 4321)',
    status: 'Delivered'
  }
];

export const useUserStore = create<UserState>((set) => ({
  user: null,
  orders: DEFAULT_ORDERS,
  isAuthenticated: false,
  isCheckingAuth: true,
  pendingWishlistAction: (() => {
    try {
      const data = sessionStorage.getItem('pendingWishlistAction');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  })(),
  pendingCartAction: (() => {
    try {
      const data = sessionStorage.getItem('pendingCartAction');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  })(),
  authStep: (() => {
    try {
      const step = sessionStorage.getItem('authStep');
      return (step as any) || 'idle';
    } catch {
      return 'idle';
    }
  })(),
  pendingRegisterEmail: (() => {
    try {
      return sessionStorage.getItem('pendingRegisterEmail');
    } catch {
      return null;
    }
  })(),
  pendingLoginEmail: (() => {
    try {
      return sessionStorage.getItem('pendingLoginEmail');
    } catch {
      return null;
    }
  })(),

  setAuthStep: (step) => {
    set({ authStep: step });
    try {
      sessionStorage.setItem('authStep', step);
      if (step === 'idle') {
        sessionStorage.removeItem('pendingRegisterEmail');
        sessionStorage.removeItem('pendingLoginEmail');
        sessionStorage.removeItem('pendingOtpGeneratedAt');
        sessionStorage.removeItem('pendingOtpAttempts');
        set({ pendingRegisterEmail: null, pendingLoginEmail: null });
      }
    } catch (e) {
      console.error('Failed to sync authStep to sessionStorage', e);
    }
  },

  setPendingWishlistAction: (product) => {
    set({ pendingWishlistAction: product });
    try {
      if (product) {
        sessionStorage.setItem('pendingWishlistAction', JSON.stringify(product));
      } else {
        sessionStorage.removeItem('pendingWishlistAction');
      }
    } catch (e) {
      console.error('Failed to sync pendingWishlistAction to sessionStorage', e);
    }
  },

  setPendingCartAction: (action) => {
    set({ pendingCartAction: action });
    try {
      if (action) {
        sessionStorage.setItem('pendingCartAction', JSON.stringify(action));
      } else {
        sessionStorage.removeItem('pendingCartAction');
      }
    } catch (e) {
      console.error('Failed to sync pendingCartAction to sessionStorage', e);
    }
  },

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await api.get('/auth/profile');
      if (response.data?.data?.user) {
        const backendUser = response.data.data.user;
        set({
          user: {
            name: backendUser.name,
            email: backendUser.email,
            phone: backendUser.phone || '',
            addresses: backendUser.addresses || [],
            savedCards: backendUser.savedCards || []
          },
          isAuthenticated: true
        });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data?.success) {
        set({ authStep: 'loginOtp', pendingLoginEmail: email });
        try {
          sessionStorage.setItem('authStep', 'loginOtp');
          sessionStorage.setItem('pendingLoginEmail', email);
          sessionStorage.setItem('pendingOtpGeneratedAt', Date.now().toString());
          sessionStorage.setItem('pendingOtpAttempts', '3');
        } catch (e) {
          console.error(e);
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Incorrect email or password';
      useToastStore.getState().addToast(message, 'error');
      throw error;
    }
  },

  signup: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      if (response.data?.success) {
        set({ authStep: 'registerOtp', pendingRegisterEmail: email });
        try {
          sessionStorage.setItem('authStep', 'registerOtp');
          sessionStorage.setItem('pendingRegisterEmail', email);
          sessionStorage.setItem('pendingOtpGeneratedAt', Date.now().toString());
          sessionStorage.setItem('pendingOtpAttempts', '3');
        } catch (e) {
          console.error(e);
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      useToastStore.getState().addToast(message, 'error');
      throw error;
    }
  },

  verifyRegisterOtp: async (email, code) => {
    try {
      const response = await api.post('/auth/verify-register-otp', { email, otp: code });
      const backendUser = response.data?.data?.user;
      if (backendUser) {
        sessionStorage.removeItem('authStep');
        sessionStorage.removeItem('pendingRegisterEmail');
        sessionStorage.removeItem('pendingOtpGeneratedAt');
        sessionStorage.removeItem('pendingOtpAttempts');

        set({
          user: {
            name: backendUser.name,
            email: backendUser.email,
            phone: backendUser.phone || '',
            addresses: backendUser.addresses || [],
            savedCards: backendUser.savedCards || []
          },
          isAuthenticated: true,
          authStep: 'idle',
          pendingRegisterEmail: null
        });
        useToastStore.getState().addToast('Account created successfully!', 'success');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Verification failed';
      useToastStore.getState().addToast(message, 'error');
      throw error;
    }
  },

  resendRegisterOtp: async (email) => {
    try {
      const response = await api.post('/auth/resend-register-otp', { email });
      if (response.data?.success) {
        try {
          sessionStorage.setItem('pendingOtpGeneratedAt', Date.now().toString());
          sessionStorage.setItem('pendingOtpAttempts', '3');
        } catch {}
        useToastStore.getState().addToast('Verification code resent successfully', 'success');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Resend code failed';
      useToastStore.getState().addToast(message, 'error');
      throw error;
    }
  },

  verifyLoginOtp: async (email, code) => {
    try {
      const response = await api.post('/auth/verify-login-otp', { email, otp: code });
      const backendUser = response.data?.data?.user;
      if (backendUser) {
        sessionStorage.removeItem('authStep');
        sessionStorage.removeItem('pendingLoginEmail');
        sessionStorage.removeItem('pendingOtpGeneratedAt');
        sessionStorage.removeItem('pendingOtpAttempts');

        set({
          user: {
            name: backendUser.name,
            email: backendUser.email,
            phone: backendUser.phone || '',
            addresses: backendUser.addresses || [],
            savedCards: backendUser.savedCards || []
          },
          isAuthenticated: true,
          authStep: 'idle',
          pendingLoginEmail: null
        });
        useToastStore.getState().addToast(`Welcome back, ${backendUser.name}!`, 'success');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Verification failed';
      useToastStore.getState().addToast(message, 'error');
      throw error;
    }
  },

  resendLoginOtp: async (email) => {
    try {
      const response = await api.post('/auth/resend-login-otp', { email });
      if (response.data?.success) {
        try {
          sessionStorage.setItem('pendingOtpGeneratedAt', Date.now().toString());
          sessionStorage.setItem('pendingOtpAttempts', '3');
        } catch {}
        useToastStore.getState().addToast('Verification code resent successfully', 'success');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Resend code failed';
      useToastStore.getState().addToast(message, 'error');
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Ignore logout api errors for UI state clearing
    } finally {
      set({ user: null, isAuthenticated: false });
      useToastStore.getState().addToast('Successfully signed out.', 'info');
    }
  },

  addOrder: (order) => {
    set((state) => ({
      orders: [order, ...state.orders]
    }));
    useToastStore.getState().addToast('Order placed successfully!', 'success');
  },

  updateProfile: (profile) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...profile } : null
    }));
    useToastStore.getState().addToast('Profile updated.', 'success');
  },

  addAddress: (address) => {
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          addresses: [...state.user.addresses, address]
        }
      };
    });
    useToastStore.getState().addToast('Address saved.', 'success');
  }
}));
