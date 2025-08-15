import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../components/UserCard";

const initialState: User | null = null;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (_, action) => {
            return action.payload;
        },
        removeUser: () => {
            return null;
        }
    }
})

export const { addUser, removeUser } = userSlice.actions

export default userSlice.reducer