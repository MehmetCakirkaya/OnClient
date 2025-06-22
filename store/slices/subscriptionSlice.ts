import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PlanType = 'free' | 'premium';

export interface Subscription {
  id: string;
  userId: string;
  planType: PlanType;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  customerLimit: number;
  hasNotifications: boolean;
  hasNotes: boolean;
  hasUnlimitedCustomers: boolean;
}

interface SubscriptionState {
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
  plans: {
    free: {
      name: string;
      price: number;
      customerLimit: number;
      features: string[];
    };
    premium: {
      name: string;
      price: number;
      customerLimit: number;
      features: string[];
    };
  };
}

const initialState: SubscriptionState = {
  subscription: null,
  isLoading: false,
  error: null,
  plans: {
    free: {
      name: 'Ücretsiz Plan',
      price: 0,
      customerLimit: 3,
      features: [
        'En fazla 3 müşteri',
        'Temel müşteri yönetimi',
        'Durum takibi',
        'Temel raporlar',
      ],
    },
    premium: {
      name: 'Premium Plan',
      price: 29.99,
      customerLimit: -1, // Unlimited
      features: [
        'Sınırsız müşteri',
        'Gelişmiş müşteri yönetimi',
        'Not ekleme özelliği',
        'Hatırlatma bildirimleri',
        'Detaylı raporlar',
        '7/24 destek',
        'Meta API entegrasyonu',
      ],
    },
  },
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSubscription: (state, action: PayloadAction<Subscription>) => {
      state.subscription = action.payload;
    },
    updateSubscription: (state, action: PayloadAction<Partial<Subscription>>) => {
      if (state.subscription) {
        state.subscription = { ...state.subscription, ...action.payload };
      }
    },
    upgradeToPremium: (state, action: PayloadAction<{ endDate: string }>) => {
      if (state.subscription) {
        state.subscription.planType = 'premium';
        state.subscription.isActive = true;
        state.subscription.endDate = action.payload.endDate;
        state.subscription.customerLimit = -1;
        state.subscription.hasNotifications = true;
        state.subscription.hasNotes = true;
        state.subscription.hasUnlimitedCustomers = true;
      }
    },
    downgradeToFree: (state) => {
      if (state.subscription) {
        state.subscription.planType = 'free';
        state.subscription.endDate = undefined;
        state.subscription.customerLimit = 3;
        state.subscription.hasNotifications = false;
        state.subscription.hasNotes = false;
        state.subscription.hasUnlimitedCustomers = false;
      }
    },
    cancelSubscription: (state) => {
      if (state.subscription) {
        state.subscription.isActive = false;
      }
    },
    reactivateSubscription: (state) => {
      if (state.subscription) {
        state.subscription.isActive = true;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setSubscription,
  updateSubscription,
  upgradeToPremium,
  downgradeToFree,
  cancelSubscription,
  reactivateSubscription,
  setError,
  clearError,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer; 