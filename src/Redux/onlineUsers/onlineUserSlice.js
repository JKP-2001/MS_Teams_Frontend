import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    users:[],
    isLoading: false,
    error: ""
}


const onlineUserSlice = createSlice({
    name: "onlineUsers",
    initialState,
    reducers: {
        fetchOnlineUsersLoading: (state) => { state.isLoading = true },
        fetchOnlineUsersSuccess: (state, { payload }) => {
            state.isLoading = false; 
            state.users = payload.users;
        },
        fetchOnlineUsersFail: (state, { payload }) => { state.isLoading = false; state.error = payload },
        
    }
})


const { reducer, actions } = onlineUserSlice;

export const { fetchOnlineUsersLoading, fetchOnlineUsersSuccess, fetchOnlineUsersFail } = actions;

export default reducer;
