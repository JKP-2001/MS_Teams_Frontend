import { createSlice } from "@reduxjs/toolkit";
import showToast from "../../Utils/showToast";


const url = "http://localhost:5000/teams_clone/v1"
const key = "PLACEMENT-PROJECT"

const initialState = {
    members:[],
    admins:[],
    owner:null,
    grpName:''
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
    }
})

const {reducer,actions} = grpSlice;

const {setMembers, setAdmins, setOwner, setGrpName} = actions;

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
        }catch(err){
            // dispatch(setError(err.toString()));
            console.log(err.toString());
            return;
        }
    }
}


export function addMemberToGroup(id,email){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/group/member/${id}?action=add`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({email})
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
            showToast({
                msg:'Successfully added to the group.',
                type:'success',
                duration:3000
            })
            dispatch(getMembers(id));
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