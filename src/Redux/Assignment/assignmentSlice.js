import { createSlice } from "@reduxjs/toolkit";
import showToast from "../../Utils/showToast";

const initialState = {
    data:null,
    files:[],
    logginUserData:null,
    submissionInfo:null,
    particularUserData:null
};

const url = process.env.REACT_APP_BASE_DEV?process.env.REACT_APP_BASE_DEV_URL:process.env.REACT_APP_BASE_URL;
const key = "PLACEMENT-PROJECT"


const assignmentSlice = createSlice({
    name:"Assignment",
    initialState,
    reducers:{
        setAssignment(state,action){
            state.data = action.payload
        },
        setFiles(state,action){
            state.files = action.payload;
        },
        setLoginUserData(state,action){
            state.logginUserData = action.payload;
        },
        setSubmittedBy(state,action){
            state.submissionInfo = action.payload;
        },
        setPaticularUserFiles(state,action){
            state.particularUserData = action.payload;
        }

    }
})

const {reducer,actions} = assignmentSlice;

export const {setAssignment,setFiles,setLoginUserData,setSubmittedBy,setPaticularUserFiles} = actions;

export default reducer;

// export function deleteFromPostItemsArray(index){
//     return async function fetchProductThunk(dispatch,getState){
//         try{
//             let postState = getState().assignment;
//             let items = [...postState.items];
//             items.splice(index,1);

//             dispatch(setItems(items));

//         }catch(err){
//             // dispatch(setError(err.toString()));
//             console.log(err.toString());
//             return;
//         }
//     }
// }




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
                // showToast({
                //     msg:json.error.substring(json.error.indexOf(':') + 1),
                //     type:"error",
                //     duration:3000
                // })
            }
            else{
                dispatch(setAssignment(json.details));
                dispatch(setFiles(json.details.files));
            }
        }catch(err){
            console.log(err);
        }
    }
}


export function deleteFromFileArray(index){
    return async function fetchProductThunk(dispatch,getState){
        try{
            let assState = getState().assignment;
            let items = [...assState.files];
            items.splice(index,1);

            dispatch(setFiles(items));

        }catch(err){
            // dispatch(setError(err.toString()));
            console.log(err.toString());
            return;
        }
    }
}


export function getLoginUserData(ass_id,user_id){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/grp/assignment/user_files`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({ass_id,user_id})
            });
            const json = await response.json();
            if(!json.success){
                // showToast({
                //     msg:json.error.substring(json.error.indexOf(':') + 1),
                //     type:"error",
                //     duration:3000
                // })
                dispatch(setLoginUserData(null));
            }
            else{
                dispatch(setLoginUserData(json.info));
            }
        }catch(err){
            console.log(err);
        }
    }
}


export function getPartUserData(ass_id,user_id){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/grp/assignment/user_files`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({ass_id,user_id})
            });
            const json = await response.json();
            if(!json.success){
                // showToast({
                //     msg:json.error.substring(json.error.indexOf(':') + 1),
                //     type:"error",
                //     duration:3000
                // })
                dispatch(setLoginUserData(null));
            }
            else{
                dispatch(setPaticularUserFiles(json.info));
            }
        }catch(err){
            console.log(err);
        }
    }
}


export function getSubInfo(ass_id){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const response = await fetch(`${url}/assignment/get-turnedinby`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'security-key': key,
                    'auth-token':localStorage.getItem('token')
                },
                body: JSON.stringify({ass_id})
            });
            const json = await response.json();
            if(!json.success){
                // showToast({
                //     msg:json.error.substring(json.error.indexOf(':') + 1),
                //     type:"error",
                //     duration:3000
                // })
                dispatch(setSubmittedBy(null));
            }
            else{
                dispatch(setSubmittedBy(json.details));
            }
        }catch(err){
            console.log(err);
        }
    }
}





