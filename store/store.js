import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { dashboardApi } from './api/dashboardApi';
import { eventsApi } from './api/eventsApi';
import { gamesApi } from './api/gamesApi';
import { usersApi } from './api/usersApi';
import { promoApi } from './api/promoApi';
import { shopApi } from './api/shopApi';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [promoApi.reducerPath]: promoApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      dashboardApi.middleware,
      eventsApi.middleware,
      gamesApi.middleware,
      usersApi.middleware,
      promoApi.middleware,
      shopApi.middleware
    ),
});

export default store;