import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    authData:null,
    status:"idle",
    loading:false,
    error:null,
    token:null
}


const authRegSlice = createSlice({
    name:"authReg",
    initialState,
    reducers:{
        setStatus(state,action){
            state.status = action.payload
        },
        setLoading(state,action){
            state.loading = action.payload
        },
        setError(state,action){
            state.loading = action.payload
        },
        setToken(state,action){
            state.token = action.payload
        },
        setAuthData(state,action){
            state.authData = action.payload
        },
        clearAuthData(state,action){
            state.authData = null
        }
    }
})


const {reducer,action} = authRegSlice;

export const {setStatus,setLoading,setError,setToken,setAuthData,clearAuthData} = action;

export default reducer;


export function registerUser(firstName, lastName, email){
    return async function fetchProductThunk (dispatch,getState){
        const response = await fetch(`${url}/account/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key
            },
            body: JSON.stringify({ firstName, lastName, email })
        });
        const json = await response.json();
        dispatch(setAuthData(json));    
    }
}