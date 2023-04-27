import {fetchUserLoading,fetchUserSuccess,fetchUserFail} from "./userSlice";

const BASE_URL = process.env.REACT_APP_BASE_DEV_URL;

export const fetchUser=(name)=>async (dispatch)=>{
    dispatch (fetchUserLoading());
    try{
        let result=await fetch(`${BASE_URL}/account/getUser`,{
            method:"post",
            headers:{
                "Content-Type":"application/josn",
                "auth-token":localStorage.getItem('token'),
                "security-key":"PLACEMENT-PROJECT"
            }
        })
        const response=await result.json();
        if(response.success)
        {
            dispatch(fetchUserSuccess(response.user));
        }
        else
        {
            dispatch(fetchUserFail(response.message))
        }

    }catch(error){
        dispatch(fetchUserFail(error.message))
    }
}