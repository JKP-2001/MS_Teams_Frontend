import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import showToast from "../../Utils/showToast"

// const url = process.env.REACT_APP_BASE_URL;
const url = process.env.REACT_APP_BASE_DEV?process.env.REACT_APP_BASE_DEV_URL:process.env.REACT_APP_BASE_URL;
const key = "PLACEMENT-PROJECT"


const initialState = {
    data:null,
    user_groups:null,
    status: 'idle',
    error: "none",
    loading: false,
    authenticated:false,
    user_assignements:null,
    user_comp_assignment:null
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setData(state,action){
            state.data = action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        },
        setError(state,action){
            state.error = action.payload
            // showToast({
            //     msg:state.error,
            //     type:"error",
            //     duration:3000
            // })
        },
        setLoading(state,action){
            state.loading = action.payload
        },
        setUserGroups(state,action){
            state.user_groups = action.payload
        },
        setAuthenticated(state,action){
            state.authenticated = action.payload
        },
        setUserAssignments(state,action){
            state.user_assignements = action.payload;
        },
        setCompletedAssignments(state,action){
            state.user_comp_assignment = action.payload;
        }
    }
})

const { reducer, actions } = authSlice;

export const {setData, setError, setLoading, setStatus, setUserGroups, setAuthenticated, setUserAssignments, setCompletedAssignments} = actions;

export default reducer;

export function getUserProfile(){
    return async function fetchProductThunk(dispatch,getState){
        try{
            dispatch(setLoading(true));
            const response = await fetch(`${url}/account/getuserdetail`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json = await response.json();
            dispatch(setLoading(false));
            if(!json.success){
                throw new Error(json.error);
            }
            dispatch(setData(json.detail));
        }catch(err){
            dispatch(setError(err.toString()));
        }
    }
}


export function getUserAssignments(){
    return async function fetchProductThunk(dispatch,getState){
        try{
            dispatch(setLoading(true));
            const response = await fetch(`${url}/get-assignments`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json = await response.json();
            dispatch(setLoading(false));
            if(!json.success){
                throw new Error(json.error);
            }
            dispatch(setUserAssignments(json.details));
        }catch(err){
            dispatch(setError(err.toString()));
        }
    }
}


export function getUserCompAssignments(){
    return async function fetchProductThunk(dispatch,getState){
        try{
            dispatch(setLoading(true));
            const response = await fetch(`${url}/get-assignment/completed`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json = await response.json();
            dispatch(setLoading(false));
            if(!json.success){
                throw new Error(json.error);
            }
            dispatch(setCompletedAssignments(json.details));
        }catch(err){
            dispatch(setError(err.toString()));
        }
    }
}


export function userGroups(){
    return async function fetchProductThunk(dispatch,getState){
        try{
            dispatch(setLoading(true));
            const response = await fetch(`${url}/group/userallgroups`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json = await response.json();
            dispatch(setLoading(false));
            if(!json.success){
                throw new Error(json.error);
            }
            dispatch(setUserGroups(json.details));
        }catch(err){
            dispatch(setError(err.toString()));
        }
    }
}


export function setUserAuthState(){
    return async function fetchProductThunk(dispatch,getState){
        try{
            dispatch(setLoading(true));
            const response = await fetch(`${url}/auth/check-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
            });
            const json = await response.json();
            dispatch(setLoading(false));
            // if(!json.success){
            //     throw new Error(json.error);
            // }
            dispatch(setAuthenticated(true));
            return json;
        }catch(err){
            console.log(err);
        }
    }
}





// export const checkToken = async ()=>{
//     try{
//         dispatch(setLoading(true));
//         const response = await fetch(`${url}/account/auth/checktoken`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'security-key': key,
//                 'auth-token':localStorage.getItem('token')
//             },
//         });
//         const json = await response.json();
//         dispatch(setLoading(false));
//         if(!json.success){
//             throw new Error(json.error);
//         }
//         dispatch(setAuthenticated(true));
//     }catch(err){
//         console.log(err);
//     }
// }