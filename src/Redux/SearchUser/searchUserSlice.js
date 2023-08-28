import { createSlice } from "@reduxjs/toolkit";
import showToast from "../../Utils/showToast";
import { io } from "socket.io-client";
import { Socket } from "../../SocketClient";

const initialState = {
    users:[],
    currentOpenChat:null,
    allChats:[],
    messages:[],
    notifications:[],
};

const url = process.env.REACT_APP_BASE_DEV==="true"?process.env.REACT_APP_BASE_SOCKET_URL:process.env.REACT_APP_BASE_SOCKET_DEV_URL;
const key = "PLACEMENT-PROJECT"

// console.log({url})




const assignmentSlice = createSlice({
    name:"SearchUser",
    initialState,
    reducers:{
        setSearchUser(state,action){
            state.users = action.payload
        },
        setCurrentOpenChat(state,action){
            state.currentOpenChat = action.payload
        },
        setAllChats(state,action){
            state.allChats = action.payload
        },
        setMessages(state,action){
            state.messages = action.payload
        },
        setNotifications(state,action){
            state.notifications = action.payload
        }
    }
})

const {reducer,actions} = assignmentSlice;

export const {setSearchUser,setCurrentOpenChat,setAllChats,setMessages,setNotifications} = actions;

export default reducer;



export function fetchSearchUser(input){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/user/alluser?search=${input}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                }
            });
            const json = await response.json();
            if(!json.success){
                // showToast({
                //     msg:json.error.substring(json.error.indexOf(':') + 1),
                //     type:"error",
                //     duration:3000
                // })
            }
            else{
                dispatch(setSearchUser(json.users));
            }
        }catch(err){
            console.log(err);
        }
    }
}

export function fetchAllChats(){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/chat/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                }
            });
            const json = await response.json();
            if(!json.success){
                // showToast({
                //     msg:json.error.substring(json.error.indexOf(':') + 1),
                //     type:"error",
                //     duration:3000
                // })
            }
            else{
                dispatch(setAllChats(json.details));
            }
        }catch(err){
            console.log(err);
        }
    }
}


export function fetchOrCreateChat(userId){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body:JSON.stringify({userId})
            });
            const json = await response.json();
            if(!json.success){
                // showToast({
                //     msg:json.error.substring(json.error.indexOf(':') + 1),
                //     type:"error",
                //     duration:3000
                // })
            }
            else{
                dispatch(setCurrentOpenChat(json.details));
                dispatch(fetchAllChats());
            }
        }catch(err){
            console.log(err);
        }
    }
}


export function fetchAllMessages(chatId){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/chat/allchats/${chatId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                }
            });
            const json = await response.json();
            if(!json.success){
                // showToast({
                //     msg:json.error.substring(json.error.indexOf(':') + 1),
                //     type:"error",
                //     duration:3000
                // })
            }
            else{
                dispatch(setMessages(json.details));
            }
        }catch(err){
            console.log(err);
        }
    }
}


export function fetchNotifications(){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/chat/notification/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json = await response.json();
            if(!json.success){
                // showToast({
                //     msg:json.error.substring(json.error.indexOf(':') + 1),
                //     type:"error",
                //     duration:3000
                // })
            }
            else{
                dispatch(setNotifications(json.details));
            }
        }catch(err){
            console.log(err);
        }
    }
}


export function setTheNotifications(chatId,number){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/chat/notification`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body:JSON.stringify({chatId,number})
            });
            const json = await response.json();
            if(!json.success){
                // showToast({
                //     msg:json.error.substring(json.error.indexOf(':') + 1),
                //     type:"error",
                //     duration:3000
                // })
            }
            else{
                dispatch(fetchNotifications());
            }
        }catch(err){
            console.log(err);
        }
    }
}


export function SendMessage(chatId,content){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/chat/chatting`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body:JSON.stringify({chatId,content})
            });
            const json = await response.json();
            if(!json.success){
                // showToast({
                //     msg:json.error.substring(json.error.indexOf(':') + 1),
                //     type:"error",
                //     duration:3000
                // })
            }
            else{
                let newMessage = json.details;
                
                Socket?.emit("new message",newMessage);
                

                let mesages = getState().searchedUsers.messages;
                mesages = [...mesages];
                mesages.push(newMessage);
                dispatch(setMessages(mesages));
                // console.log({mesages})

                dispatch(fetchAllChats());
                dispatch(fetchNotifications());
            }
        }catch(err){
            console.log(err);
        }
    }
}


