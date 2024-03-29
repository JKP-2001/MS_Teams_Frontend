import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.js/userSlice";
import authReducer from "./authentication/authSlice";
import grpReducer from "./Group/groupSlice"
import postReducer from "./Post/postSlice"
import assignmentReducer from "./Assignment/assignmentSlice"
import conversationReducer from "./conversations/conversationSlice"
import messageReducer from "./messages/messageSlics";
import onlineUserReducer from "./onlineUsers/onlineUserSlice"
import searchUserReducer from "./SearchUser/searchUserSlice"
import noteSlice from "./Notes/notesSlice"

const store=configureStore({
    reducer:{
        user:userReducer,
        auth: authReducer,
        group:grpReducer,
        post: postReducer,
        assignment:assignmentReducer,
        conversations:conversationReducer,
        messages:messageReducer,
        onlineUsers:onlineUserReducer,
        searchedUsers:searchUserReducer,
        notes:noteSlice
    }
})

export default store;