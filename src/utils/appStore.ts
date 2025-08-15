import  { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import feedReducer from './feedSlice';
import type { User } from '../components/UserCard';
export const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer
    }
})

// export type RootState = ReturnType<typeof appStore.getState>

export interface RootState {
  user: User | null;
  feed: User[] | []
}