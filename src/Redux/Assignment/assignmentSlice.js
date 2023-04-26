import { createSlice } from "@reduxjs/toolkit";
import showToast from "../../Utils/showToast";

const initialState = {
    data:null
};

const url = process.env.REACT_APP_BASE_URL;
const key = "PLACEMENT-PROJECT"


const assignmentSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAssignment(state,action){
            state.data = action.payload
        }
    }
})

const {reducer,actions} = assignmentSlice;

export const {setAssignment} = actions;

export default reducer;




export function fetchAssignment(grpid,assid){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/grp/assignment/${assid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({grp_id:grpid})
            });
            const json = await response.json();
            if(!json.success){
                showToast({
                    msg:json.error.substring(json.error.indexOf(':') + 1),
                    type:"error",
                    duration:3000
                })
            }
            else{
                dispatch(setAssignment(json.details));
            }
        }catch(err){
            console.log(err);
        }
    }
}