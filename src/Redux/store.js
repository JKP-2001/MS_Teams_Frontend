import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.js/userSlice";
import conversationReducer from "./conversations/conversationSlice"
import authReducer from "./authentication/authSlice";
import grpReducer from "./Group/groupSlice"

const store=configureStore({
    reducer:{
        user:userReducer,
        conversations:conversationReducer,
        auth: authReducer,
        group:grpReducer
    }
})

export default store;