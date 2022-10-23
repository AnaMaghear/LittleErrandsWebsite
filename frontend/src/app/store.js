import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import errandReducer from '../features/errand/errandSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    errand: errandReducer
  },
});
