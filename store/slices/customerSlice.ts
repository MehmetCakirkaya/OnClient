import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  campaign: string;
  source: string;
  createdAt: string;
  lastContactDate?: string;
  status: 'not-contacted' | 'contacted' | 'converted' | 'not-interested';
  notes: Note[];
  reminderDate?: string;
  hasReminder: boolean;
}

export interface Note {
  id: string;
  text: string;
  createdAt: string;
  type: 'call' | 'email' | 'meeting' | 'general';
}

interface CustomerState {
  customers: Customer[];
  filteredCustomers: Customer[];
  isLoading: boolean;
  error: string | null;
  filters: {
    status: string;
    dateRange: string;
    search: string;
  };
  selectedCustomer: Customer | null;
}

const initialState: CustomerState = {
  customers: [],
  filteredCustomers: [],
  isLoading: false,
  error: null,
  filters: {
    status: 'all',
    dateRange: 'all',
    search: '',
  },
  selectedCustomer: null,
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
      state.filteredCustomers = action.payload;
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
      state.filteredCustomers.push(action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
        const filteredIndex = state.filteredCustomers.findIndex(c => c.id === action.payload.id);
        if (filteredIndex !== -1) {
          state.filteredCustomers[filteredIndex] = action.payload;
        }
      }
    },
    updateCustomerStatus: (state, action: PayloadAction<{ id: string; status: Customer['status'] }>) => {
      const customer = state.customers.find(c => c.id === action.payload.id);
      if (customer) {
        customer.status = action.payload.status;
        customer.lastContactDate = new Date().toISOString();
      }
    },
    addNote: (state, action: PayloadAction<{ customerId: string; note: Note }>) => {
      const customer = state.customers.find(c => c.id === action.payload.customerId);
      if (customer) {
        customer.notes.push(action.payload.note);
      }
    },
    setReminder: (state, action: PayloadAction<{ customerId: string; reminderDate: string }>) => {
      const customer = state.customers.find(c => c.id === action.payload.customerId);
      if (customer) {
        customer.reminderDate = action.payload.reminderDate;
        customer.hasReminder = true;
      }
    },
    removeReminder: (state, action: PayloadAction<string>) => {
      const customer = state.customers.find(c => c.id === action.payload);
      if (customer) {
        customer.reminderDate = undefined;
        customer.hasReminder = false;
      }
    },
    setFilters: (state, action: PayloadAction<Partial<CustomerState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    applyFilters: (state) => {
      let filtered = [...state.customers];

      // Status filter
      if (state.filters.status !== 'all') {
        filtered = filtered.filter(customer => customer.status === state.filters.status);
      }

      // Search filter
      if (state.filters.search) {
        const searchTerm = state.filters.search.toLowerCase();
        filtered = filtered.filter(customer => 
          customer.name.toLowerCase().includes(searchTerm) ||
          customer.email.toLowerCase().includes(searchTerm) ||
          customer.phone.includes(searchTerm)
        );
      }

      // Date range filter
      if (state.filters.dateRange !== 'all') {
        const now = new Date();
        const daysAgo = parseInt(state.filters.dateRange);
        const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
        
        filtered = filtered.filter(customer => 
          new Date(customer.createdAt) >= cutoffDate
        );
      }

      state.filteredCustomers = filtered;
    },
    setSelectedCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setCustomers,
  addCustomer,
  updateCustomer,
  updateCustomerStatus,
  addNote,
  setReminder,
  removeReminder,
  setFilters,
  applyFilters,
  setSelectedCustomer,
  setError,
} = customerSlice.actions;

export default customerSlice.reducer; 