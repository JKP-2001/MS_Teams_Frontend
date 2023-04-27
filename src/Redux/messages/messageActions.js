import { fetchMessagesLoading, fetchMessagesFail, fetchMessagesSuccess, updatemessages, addMessage } from "./messageSlics";
import { useContext } from "react";
import chatContext from "../../Context/ChatContext/chatContext";

export const fetchMessages = ({ conversation, friend }) => async dispatch => {
    // const BaseUrl = process.env.REACT_APP_BASE_URL;
    const BaseUrl = process.env.REACT_APP_BASE_DEV_URL;

    dispatch(fetchMessagesLoading);
    try {
        let url = `${BaseUrl}/getMessages/${conversation._id}`;
        let response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
                "security-key": "PLACEMENT-PROJECT"
            }
        })
        response = await response.json();
        if (response.success) {
            const payload = {
                messages: response.messages,
                friend: {
                    firstName: friend.firstName,
                    lastName: friend.lastName,
                    id: friend._id
                },
                conversation
            }
            dispatch(fetchMessagesSuccess(payload));
        }
        else {
            dispatch(fetchMessagesFail(response.message));
        }

    } catch (error) {
        dispatch(fetchMessagesFail(error.message));
    }
}


export const updateMessages = ({ message, messages, friend, sendMess }) => async (dispatch) => {
    const BaseUrl = process.env.REACT_APP_BASE_URL;
    
    try {
        let url = `${BaseUrl}/sendMessage`;
        let response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
                "security-key": "PLACEMENT-PROJECT"
            },
            body: JSON.stringify(message)
        })
        response = await response.json();
        let nextMessages = [...messages];
        if (response.success) {
            nextMessages.push(response.message);
            dispatch(updatemessages({ messages: nextMessages }));
            sendMess({ recieverId: friend.id, message: response.message });
        }
    } catch (error) {
        console.log(error.toString());
    }
}

export const addmessage = ({ newMessages }) => async (dispatch) => {
    try{
        // console.log(newMessages);
        dispatch(addMessage({messages:newMessages}));
    }catch(error)
    {
        console.log(error.toString());
    }
}