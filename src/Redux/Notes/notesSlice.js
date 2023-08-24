import { createSlice } from "@reduxjs/toolkit";
import showToast from "../../Utils/showToast";

const initialState = {
    data:[]
};

const url = process.env.REACT_APP_BASE_DEV?process.env.REACT_APP_BASE_DEV_URL:process.env.REACT_APP_BASE_URL;
const key = "PLACEMENT-PROJECT"


const noteSlice = createSlice({
    name:"Note",
    initialState,
    reducers:{
        setNote(state,action){
            state.data = action.payload
        },

    }
})

const {reducer,actions} = noteSlice;

export const {setNote} = actions;

export default reducer;

export function fetchNote(){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/notes/fetchall`, {
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
                dispatch(setNote(json.notes));
            }
        }catch(err){
            console.log(err);
        }
    }
}

