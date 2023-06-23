import React, { useEffect } from 'react'

import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ChatSideBarFriend from '../ChatSideBarFriend';
import SideBarFriend from './SideBarFriend';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllChats } from '../../Redux/SearchUser/searchUserSlice';

const ChatSideBar = (props) => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAllChats());
    },[])

    
    const chatState = useSelector((state) => state.searchedUsers);


    return (
        chatState && <div>
            <div id='z-10 hidden md:block chatSideBar' className='fixed border-[#b7b3b36d]  left-[80px] top-[60px] w-[230px] md:w-[350px] flex flex-col bg-[#f0f0f0] min-h-screen border-r-2 shadow-xl border-2 rounded-md'>
                <div id='chatSideBarTop' className='flex items-center border-b-[1px] border-gray-300 p-4' style={{ "color": "#242424" }}>
                    <div className='w-1/2 justify-start px-3 text-3xl font-mono'>
                        Chat
                    </div>
                    <div className='w-1/2 flex items-center justify-end space-x-3 px-3'>
                        <div>
                            <FilterListOutlinedIcon />
                        </div>
                        <div>
                            <SearchIcon onClick={props.openDrawer} className='hover:cursor-pointer'/>
                        </div>
                    </div>
                </div>
                {/* <div id='chatFriendsList' className='h-[100vh]' style={{ "overflowY": "auto" }}>
                    {conversations.map((c)=>{
                        return <ChatSideBarFriend key={c._id} c={c}/>
                    })}
                </div> */}
                <div className='divide-y-[0px] divide-black h-[100vh] overflow-y-auto mb-2'>
                    {chatState.allChats.map((c)=>{
                        return (<SideBarFriend key={c._id} firstName={c.users[0].firstName} lastName={c.users[0].lastName} lastMessangerName={c.users[0].firstName} lastMessage={"hello google"}/>)
                    })}
                </div>
            </div>
        </div>
    )
        
}

export default ChatSideBar