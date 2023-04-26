import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    conversations: [],
    friends:[],
    isLoading: false,
    error: ""
}


const conversationSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        fetchConversationLoading: (state) => { state.isLoading = true },
        fetchConversationSuccess: (state, { payload }) => {
            state.isLoading = false; 
            state.conversations = payload.conversations;
            state.friends=payload.friends;
        },
        fetchConversationFail: (state, { payload }) => { state.isLoading = false; state.error = payload },
    }
})


const { reducer, actions } = conversationSlice;

export const { fetchConversationLoading, fetchConversationSuccess, fetchConversationFail } = actions;

export default reducer;
