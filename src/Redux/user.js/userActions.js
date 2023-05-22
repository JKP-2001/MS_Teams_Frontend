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
        console.log({responseFromFetchUser:response});
        if(response.success)
        {
            dispatch(fetchUserSuccess(response.user));
        }
        else
        {
            const check = window.location.pathname;

            if((response.error.includes("jwt malformed") || response.error.includes("jwt expired")) && (check!=='/login' && check!=='/signup' && check!=='/verify-account' && check!=='/forgot-password' && check!=='/forgot-password' && !check.includes("set-new-password") && !check.includes("create-password") && check!=='/')){
                window.location.href = '/logout'
            }

            // dispatch(fetchUserFail(response.message));
        }
    }catch(error){
        dispatch(fetchUserFail(error.message))
    }
}