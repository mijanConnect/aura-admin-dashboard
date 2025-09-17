import { createSlice } from '@reduxjs/toolkit';

// Helper function to safely interact with localStorage
const safeLocalStorage = {
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      safeLocalStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      safeLocalStorage.removeItem('token');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    restoreAuth: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
  },
});

export const { setCredentials, logout, setLoading, restoreAuth } = authSlice.actions;
export default authSlice.reducer;