import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import errandReducer from '../features/errand/errandSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    errand: errandReducer,
    user: userReducer
  },
});
