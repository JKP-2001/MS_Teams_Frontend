import React, { useEffect } from 'react'
import NavbarCoponent from '../NavbarComponet/NavbarCoponent'
import SideBarComponent from '../SideBarComponent/SideBarComponent'
import SecondNav from '../NavbarComponet/SecondNav'
import ChatSideBar from './ChatSideBar'
import SideBar2 from './SideBar2'
import Conversation from './Conversation'
import SideDrawer from './SideDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllChats, fetchNotifications } from '../../Redux/SearchUser/searchUserSlice'

import { io } from 'socket.io-client';
import { useState } from 'react'
import { getUserAssignments, getUserProfile, userGroups } from '../../Redux/authentication/authSlice'




const ChatPage = () => {

    const [socketConnected, setSocketConnected] = useState(false);

    const dispatch = useDispatch();

    const UserState = useSelector((state) => state.auth);





    useEffect(() => {
        dispatch(getUserProfile());
        dispatch(getUserAssignments());
        dispatch(userGroups());
        dispatch(fetchAllChats());
        dispatch(fetchNotifications());
    }, [])



    const chatState = useSelector((state) => state.searchedUsers);

    

    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    let secondUser;
    
    if(UserState.data && chatState.currentOpenChat){
        secondUser = UserState.data._id === chatState.currentOpenChat.users[1]._id?chatState.currentOpenChat.users[0]:chatState.currentOpenChat.users[1];
    }



    return (

        <div>
            <div>
                < NavbarCoponent />
                <SideBarComponent />
                <div className={`min-[768px]:ml-[90px] mt-[60px] grid-cols-1 `}>
                    <div className="hidden md:flex">
                        <div className=''>
                            <SideDrawer isTyping={isTyping} />
                        </div>
                    </div>

                    {!chatState.currentOpenChat?<div className="md:hidden">
                        <div className=''>
                            <SideDrawer isTyping={isTyping} />
                        </div>
                    </div>:
                    <div>
                        <Conversation typing={typing} setIsTyping={setIsTyping} isTyping={isTyping} setTyping={setTyping} secondUser={secondUser}/>
                    </div>}
                </div>
                <div className='hidden md:block'>
                    <Conversation typing={typing} setIsTyping={setIsTyping} isTyping={isTyping} setTyping={setTyping} secondUser={secondUser}/>
                </div>
            </div>
        </div>
    )
}

export default ChatPage