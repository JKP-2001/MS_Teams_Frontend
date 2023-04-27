import { createSlice } from "@reduxjs/toolkit";
import showToast from "../../Utils/showToast";
import { userGroups } from "../authentication/authSlice";
import { toast } from "react-hot-toast";


// const url = process.env.REACT_APP_BASE_URL;
const url = process.env.REACT_APP_BASE_DEV_URL;
const key = "PLACEMENT-PROJECT"

const initialState = {
    members:[],
    admins:[],
    owner:null,
    grpName:'',
    grpItems:[],
    grpCode:"",
    adminsEmail:[],
    assignmentPosted:[]
}


const grpSlice = createSlice({
    name:"group",
    initialState,
    reducers:{
        setMembers(state,action){
            state.members = action.payload
        },
        setAdmins(state,action){
            state.admins = action.payload
        },
        setOwner(state,action){
            state.owner = action.payload
        },
        setGrpName(state,action){
            state.grpName = action.payload
        },
        setGrpItems(state,action){
            state.grpItems = action.payload
        },
        setGrpCode(state,action){
            state.grpCode = action.payload
        },
        setAdminsEmail(state,action){
            state.adminsEmail = action.payload;
        },
        setAssignmentPosted(state,action){
            state.assignmentPosted = action.payload;
        }
    }
})

const {reducer,actions} = grpSlice;

const {setMembers, setAdmins, setOwner, setGrpName, setGrpItems, setGrpCode, setAdminsEmail, setAssignmentPosted} = actions;

export default reducer;


export function getMembers(id){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/group/allmembers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({group_id:id})
            });
            const json = await response.json();
            if(!json.success){
                throw new Error(json.error);
            }
            dispatch(setMembers(json.details.members));
            dispatch(setAdmins(json.details.admins));
            dispatch(setOwner(json.details.owner))
            var arr = [];
            const Grpstate = getState();
            
            Grpstate.group.admins.map((mem) => {
                arr.push(mem.email);
            })
            dispatch(setAdminsEmail(arr));
        }catch(err){
            // dispatch(setError(err.toString()));
            console.log(err.toString());
            return;
        }
    }
}

export function getGrpDetails(id){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/group/getDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({group_id:id})
            });
            const json = await response.json();
            if(!json.success){
                throw new Error(json.error);
            }
            dispatch(setGrpName(json.details.name));
            dispatch(setGrpCode(json.details.joiningCode));
        }catch(err){
            // dispatch(setError(err.toString()));
            console.log(err.toString());
            return;
        }
    }
}


export function getGrpItems(id){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/group/allitems`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({group_id:id})
            });
            const json = await response.json();
            if(!json.success){
                throw new Error(json.error);
            }
            dispatch(setGrpItems(json.details));
        }catch(err){
            // dispatch(setError(err.toString()));
            console.log(err.toString());
            return;
        }
    }
}


export function addMemberToGroup(id,email,query){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/group/member/${id}?action=${query}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({email})
            });

            const json = await response.json();

            return json;

            

        }catch(err){
            // dispatch(setError(err.toString()));
            console.log(err);
            // showToast({
            //     msg:err,
            //     type:'error',
            //     duration:3000
            // })
            return;
        }
    }
}

export function getAssignmentOfAGrp(id){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/group/assignments/all`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({grp_id:id})

            });
            const json = await response.json();
            if(!json.success){
                showToast({
                    msg:json.error.substring(json.error.indexOf(':') + 1),
                    type:'error',
                    duration:3000
                })
                throw new Error(json.error);
            }
            dispatch(setAssignmentPosted(json.details))
        }catch(err){
            // dispatch(setError(err.toString()));
            console.log(err);
            // showToast({
            //     msg:err,
            //     type:'error',
            //     duration:3000
            // })
            return;
        }
    }
}