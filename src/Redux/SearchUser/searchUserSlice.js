import { createSlice } from "@reduxjs/toolkit";
import showToast from "../../Utils/showToast";

const initialState = {
    users:[],
    currentOpenChat:null,
    allChats:[]
};

const url = process.env.REACT_APP_BASE_DEV==="true"?process.env.REACT_APP_BASE_SOCKET_DEV_URL:process.env.REACT_APP_BASE_SOCKET_URL;
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
        }


    }
})

const {reducer,actions} = assignmentSlice;

export const {setSearchUser,setCurrentOpenChat,setAllChats} = actions;

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
