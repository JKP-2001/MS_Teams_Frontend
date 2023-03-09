import React from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { useNavigate } from 'react-router';
import { getDummyUser } from '../Redux/authentication/authSlice';

export default function Universal_left_bar() {
    const navigate=useNavigate();
    return (
        <>
            <div className='bg-[#ebebeb] fixed top-[60px] w-[75px] bottom-0 flex flex-col'>
                <div className='flex flex-col py-4 cursor-pointer hover:bg-white' style={{"color":"#616161"}}>
                    <div className='flex justify-center items-center'>
                        <NotificationsNoneIcon/>
                    </div>
                    <div className=' text-center' style={{"fontSize":"12px"}} >
                        Activity
                    </div>
                </div>
                <div className='flex flex-col py-4 cursor-pointer hover:bg-white' style={{"color":"#616161"}}>
                    <div className='flex justify-center items-center'>
                        <AssignmentIndOutlinedIcon/>
                    </div>
                    <div className=' text-center' style={{"fontSize":"12px"}}>
                        Assignments
                    </div>
                </div>
                <div className='flex flex-col py-4 cursor-pointer hover:bg-white' style={{"color":"#616161"}}>
                    <div className='flex justify-center items-center'>
                        <ChatOutlinedIcon/>
                    </div>
                    <div className=' text-center' style={{"fontSize":"12px"}} onClick={()=>{navigate("/chats")}}>
                        Chat
                    </div>
                </div>
                <div className='flex flex-col py-4 cursor-pointer hover:bg-white' style={{"color":"#616161"}}>
                    <div className='flex justify-center items-center'>
                        <GroupsOutlinedIcon/>
                    </div>
                    <div className=' text-center text-sm' style={{"fontSize":"12px"}}>
                        Teams
                    </div>
                </div>
                <div className='flex flex-col py-4 cursor-pointer  hover:bg-white' style={{"color":"#616161"}}>
                    <div className='flex justify-center items-center'>
                        <CalendarMonthOutlinedIcon/>
                    </div>
                    <div className=' text-center text-sm' style={{"fontSize":"12px"}}>
                        Calendar
                    </div>
                </div>
                <div className='flex flex-col py-4 cursor-pointer hover:bg-white' style={{"color":"#616161"}}>
                    <div className='flex justify-center items-center'>
                        <CallOutlinedIcon/>
                    </div>
                    <div className=' text-center text-sm' style={{"fontSize":"12px"}}>
                            Calls
                    </div>
                </div>
                <div className='flex flex-col py-4 cursor-pointer hover:bg-white' style={{"color":"#616161"}}>
                    <div className='flex justify-center items-center'>
                        <FileCopyOutlinedIcon/>
                    </div>
                    <div className=' text-center' style={{"fontSize":"12px"}}>
                        Files
                    </div>
                </div>
            </div>
        </>
    )
}
