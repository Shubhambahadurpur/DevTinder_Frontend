import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../components/UserCard";

const initialState: User[] = [];

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        addFeed: (_, action) => action.payload,
        removeUserFeed: (state: User[], action) => {
            const newFeed = state?.filter((user) => user?._id !== action.payload)
            return newFeed;
        }
    }
})

export const { addFeed, removeUserFeed } = feedSlice.actions;

export default feedSlice.reducer;