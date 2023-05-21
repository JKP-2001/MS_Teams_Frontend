import { createSlice } from "@reduxjs/toolkit";
import showToast from "../../Utils/showToast";

const initialState = {
    data:null,
    files:[]
};

const url = process.env.REACT_APP_BASE_DEV_URL;
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
        }
    }
})

const {reducer,actions} = assignmentSlice;

export const {setAssignment,setFiles} = actions;

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
                showToast({
                    msg:json.error.substring(json.error.indexOf(':') + 1),
                    type:"error",
                    duration:3000
                })
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


