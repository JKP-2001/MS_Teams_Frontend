import React, { useEffect, useState } from 'react'
import Universal_Navbar from './Universal_Navbar'
import Universal_left_bar from './Universal_left_bar'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ChatSideBarFriend from './ChatSideBarFriend';
import { useSelector } from 'react-redux';
import "./Chat_sidebar.css";

function Chat_sidebar() {
    const {conversations}=useSelector(state=>{return state.conversations});
    return (
        <div>
            <div id='chatSideBar' className='shadow-inner  border-[#b7b3b36d] fixed left-[72px] top-[48px] w-[230px] md:w-[320px] flex flex-col bg-[#ebebeb97] min-h-screen border-r-2 border-['>
                <div id='chatSideBarTop' className='flex items-center border-b-[1px] border-gray-300 p-4' style={{ "color": "#242424" }}>
                    <div className='w-1/2 justify-start px-3 text-2xl font-bold'>
                        Chat
                    </div>
                    <div className='w-1/2 flex items-center justify-end space-x-3 px-3'>
                        <div>
                            <FilterListOutlinedIcon />
                        </div>
                        <div>
                            <AddCommentOutlinedIcon />
                        </div>
                    </div>
                </div>
                <div id='chatFriendsList' className='h-[100vh]' style={{ "overflowY": "auto" }}>
                    {conversations.map((c)=>{
                        return <ChatSideBarFriend key={c._id} c={c}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Chat_sidebar
