import { createSlice } from "@reduxjs/toolkit";
import showToast from "../../Utils/showToast";
// import { userGroups } from "../authentication/authSlice";


// const url = "http://localhost:5000/teams_clone/v1"
// const key = "PLACEMENT-PROJECT"

const initialState = {
    items:[],
    id:[]
}


const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        setId(state,action){
            state.id = action.payload
        },
        setItems(state,action){
            state.items = action.payload
        }
    }
})

const {reducer,actions} = postSlice;

const {setId, setItems} = actions;

export default reducer;







export function getPostItemsArray(index){
    return async function fetchProductThunk(dispatch,getState){
        try{
            const grpState = getState().group;
            // console.log(grpState)
            const item = grpState.grpItems[index].files;
            dispatch(setItems(item));

        }catch(err){
            // dispatch(setError(err.toString()));
            console.log(err.toString());
            return;
        }
    }
}

export function deleteFromPostItemsArray(index){
    return async function fetchProductThunk(dispatch,getState){
        try{
            let postState = getState().post;
            let items = [...postState.items];
            items.splice(index,1);

            dispatch(setItems(items));

        }catch(err){
            // dispatch(setError(err.toString()));
            console.log(err.toString());
            return;
        }
    }
}



