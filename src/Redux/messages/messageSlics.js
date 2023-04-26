import { createSlice } from "@reduxjs/toolkit";

let initialState={
    friend:null,
    conversation:null,
    showMessages:false,
    messages:[],
    isLoading:false,
    error:""
}


const messageSlice=createSlice({
    name:"messages",
    initialState,
    reducers: {
        fetchMessagesLoading: (state) => { state.isLoading = true },
        fetchMessagesSuccess: (state, { payload }) => {
            state.isLoading = false; 
            state.messages = payload.messages;
            state.showMessages=true;
            state.friend=payload.friend;
            state.conversation=payload.conversation;
        },
        fetchMessagesFail: (state, { payload }) => { state.isLoading = false; state.error = payload },
        updatemessages:(state,{payload})=>{
            state.messages = payload.messages
        },
        addMessage:(state,{payload})=>{
            state.messages = payload.messages
        }
    }

    
})

const { reducer, actions } = messageSlice;

export const { fetchMessagesLoading, fetchMessagesSuccess, fetchMessagesFail,updatemessages,addMessage} = actions;

export default reducer;