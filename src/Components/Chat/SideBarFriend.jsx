import { Badge } from '@material-tailwind/react';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SideBarFriend = (props) => {

  console.log(props.notifications)

  const dispatch = useDispatch();

  const searchedUsers = useSelector((state) => state.searchedUsers);

  const createdAt = props.lastMessageCreatedAt;

  const time = new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  // console.log({lastMsg:props.lastMessage.length})


  return (
    <>
      <div className={`flex pl-3 mt-1 cursor-pointer ${(searchedUsers.currentOpenChat && searchedUsers.currentOpenChat._id === props.chatId) ? "bg-white" : "hover:bg-white"} pt-2 py-4 mx-2 mr-1 rounded-lg`} onClick={() => props.handleClickOnUser(props.userid, props.chatId)}>
        <div id='profileImg'>
          <img src={"https://picsum.photos/32/32/?random"} className="w-10 h-10 rounded-full mt-[0.8px]" alt="" />
        </div>
        <div id='profileName' className=' items-center pl-2'>
          <div className="name text-base font-mono">{props.firstName}</div>
          <div className="lastMessage text-xs">{props.lastMessangerName ? props.lastMessangerName : null} {props.lastMessage ? ": " + props.lastMessage : null}</div>
        </div>
        <div className="time relative flex-grow mt-2">
          <div className="text-xs absolute right-10">
            {time}
          </div>
        </div>
        {props.notifications > 0 && <Badge color="green" className="absolute top-4 right-5 h-0 w-0" content={props.notifications.toString()} />}
      </div>
    </>
  )
}

export default SideBarFriend