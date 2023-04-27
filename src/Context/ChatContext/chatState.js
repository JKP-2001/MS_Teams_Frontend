import chatContext from "./chatContext";
import React, { useState } from 'react'
import { fetchMessages } from "../../Redux/messages/messageActions";
import { useDispatch } from "react-redux";
import { updateConversations } from "../../Redux/conversations/conversationActions";
import { io } from "socket.io-client";
import { fetchOnlineUsers } from "../../Redux/onlineUsers/onlineUserActions";
import { useRef } from "react";
import { addmessage } from "../../Redux/messages/messageActions";
import { Socket } from "../../SocketClient";



function ChatState(props) {
  const dispatch=useDispatch();
  // let BaseUrl=process.env.REACT_APP_BASE_URL;
  let BaseUrl = process.env.REACT_APP_BASE_DEV_URL;
  // const socket=useRef();

 const createConversation=async ({friend,friends,conversations})=>{
  let url=`${BaseUrl}/get-conversation/${friend._id}`;
  let response = await fetch(url,{
      method:"post",
      headers:{
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem('token'),
          "security-key":"PLACEMENT-PROJECT"
      },
  })
  response =await response.json();
  if(response.success)
  {
    if(response.message==="newly created")
    {
      dispatch(updateConversations({conversation:response.conversation,friends,conversations,friend}))
    }
    dispatch(fetchMessages({conversation:response.conversation,friend}))
  }
}




  const connectSocket=({user,messages})=>{
    // socket.current=io("ws://localhost:9000")
    // socket.current=io("ws://localhost:9000")
    // if(user!==null)
    // {
    //   Socket?.emit("addUser",user.id);
    //   // socket.current?.emit("addUser",user.id);
    // }
    // socket.current?.on("getUsers",(onlineUsers)=>{
    //   dispatch(fetchOnlineUsers(onlineUsers));
    // })
    // Socket?.on("getUsers",(onlineUsers)=>{
    //   dispatch(fetchOnlineUsers(onlineUsers));
    // })
    // getMessage({messages});
  }

  const getOnlineUsers=()=>{
    // socket.current?.on("getUsers",(onlineUsers)=>{
    //   dispatch(fetchOnlineUsers(onlineUsers));
    // })
    // Socket?.on("getUsers",(onlineUsers)=>{
    //   dispatch(fetchOnlineUsers(onlineUsers));
    // })
  }

  const sendMess=({recieverId,message})=>{
    Socket?.emit("sendMessage",{recieverId,message});
    // socket.current?.emit("sendMessage",{recieverId,message});
  }

  const getMessage=({messages})=>{
    // socket.current?.on("getMessage",(message)=>{
    //   dispatch(addmessage({messages,message}));
    // })
    // Socket?.on("getMessage",(message)=>{
    //   dispatch(addmessage({messages,message}));
    // })
  }

  return (
    <chatContext.Provider value={{createConversation,connectSocket,getOnlineUsers,sendMess,getMessage}}>
    {/* <chatContext.Provider value={{createConversation}}> */}
        {props.children}
    </chatContext.Provider>
  )
}

export default ChatState
