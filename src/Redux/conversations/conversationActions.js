import {fetchConversationLoading,fetchConversationSuccess,fetchConversationFail} from "./conversationSlice";

export const fetchConversations=()=>async dispatch=>{
    // const BaseUrl=process.env.REACT_APP_BASE_URL;
    const BaseUrl = process.env.REACT_APP_BASE_DEV?process.env.REACT_APP_BASE_DEV_URL:process.env.REACT_APP_BASE_URL;
    dispatch(fetchConversationLoading())
    try{
        let response = await fetch(`${BaseUrl}/getAllConversations`,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem('token'),
                "security-key":"PLACEMENT-PROJECT"
            }
        })
        response=await response.json();
        if(response.success)
        {
            const payload={
                friends:response.friends,
                conversations:response.allConversations
            }
            dispatch(fetchConversationSuccess(payload));
        }
        else
        {
            dispatch(fetchConversationFail(response.message));
        }
    }
    catch(error)
    {
        dispatch(fetchConversationFail(error.message));
    }
}


export const updateConversations=({conversation,friends,conversations,friend})=>async dispatch=>{
    dispatch(fetchConversationLoading())
    let newFriends=[...friends];
    let newConversations=[...conversations];
    newConversations.push(conversation);
    newFriends.push(friend);
    try{
        let payload={
            conversations:newConversations,
            friends:newFriends
        }
        dispatch(fetchConversationSuccess(payload));
    }
    catch(error)
    {
        dispatch(fetchConversationFail(error.message));
    }
}