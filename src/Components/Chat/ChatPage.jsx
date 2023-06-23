import React, { useEffect } from 'react'
import NavbarCoponent from '../NavbarComponet/NavbarCoponent'
import SideBarComponent from '../SideBarComponent/SideBarComponent'
import SecondNav from '../NavbarComponet/SecondNav'
import ChatSideBar from './ChatSideBar'
import SideBar2 from './SideBar2'
import Conversation from './Conversation'
import SideDrawer from './SideDrawer'
import { useDispatch } from 'react-redux'
import { fetchAllChats } from '../../Redux/SearchUser/searchUserSlice'

const ChatPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllChats());    
    }, [])

    


    return (

        <div>
            <div>
                < NavbarCoponent />
                <SideBarComponent />
                <div className={`min-[768px]:ml-[90px] mt-[60px] grid-cols-1 `}>
                    <div className="flex">
                        <div className=''>
                            <SideDrawer />
                        </div>
                    </div>
                </div>
                <div>
                    <Conversation />
                </div>
            </div>
        </div>
    )
}

export default ChatPage