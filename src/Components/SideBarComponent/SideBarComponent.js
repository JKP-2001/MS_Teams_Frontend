import React, { useContext, useEffect, useState } from 'react'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Link, useLocation } from 'react-router-dom';
import GrpContext from '../../Context/GrpContext/GrpContext';
import { useNavigate } from 'react-router-dom';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

import { useDispatch } from 'react-redux';


export default function SideBarComponent() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { setgrpState } = useContext(GrpContext);
    const location = useLocation();
    const [currloc, setCurrloc] = useState("");

    const getCurLoc = () => {
        setCurrloc(location.pathname);
    }
    useEffect(() => {
        // Update the document title using the browser API
        getCurLoc();
    });


    return (
        <>

            <div style={{ backgroundColor: '#ebebeb' }} className='min-[768px]:grid hidden fixed top-[48px] bottom-[0px] text-center text-[10px] w-[72px]  gap-2 -z-1'>
                <button className='mt-8 w-full hover:bg-white'>
                    <div><NotificationsActiveOutlinedIcon /></div>
                    <div>Activity</div>
                </button>
                
                
                <button className={!currloc.includes("chats")?"hover:bg-white":"text-[#444791] bg-white"}  onClick={() => { navigate("/chats")}}>
                    <div><ChatBubbleOutlineOutlinedIcon /></div>
                    <div className={currloc.includes("chats")?"text-[#444791] font-bold":""}>Chats</div>
                </button>



                {currloc.includes("home") || currloc.includes("grp") ? <button className='bg-white text-[#444791]' onClick={() => setgrpState("general")}>
                    <Link to="/home"><div><GroupsOutlinedIcon /></div>
                        <div className='text-[#444791] font-bold '>Teams</div></Link>
                </button> : <button className='hover:bg-white hover:text-[#444791]' onClick={() => setgrpState("general")}>
                    <Link to="/home" onClick={() => setgrpState("general")}><div><GroupsOutlinedIcon /></div>
                        <div className=''>Teams</div></Link>
                </button>}

                {currloc.includes("assignment") ? <button className='bg-white text-[#444791]'>
                    <Link to="/assignment"><div ><AssignmentOutlinedIcon /></div></Link>
                    <div className='text-[#444791] font-bold '>Assignments</div>
                </button> : <button className='hover:bg-white hover:text-[#444791]'>
                    <Link to="/assignment"><div ><AssignmentOutlinedIcon /></div>
                        <div className=''>Assignments</div></Link>
                </button>}

                <button className='hover:bg-white '>
                    <div><CalendarMonthOutlinedIcon /></div>
                    <div>Calendar</div>
                </button>
                <button className='hover:bg-white '>
                    <div><CallOutlinedIcon /></div>
                    <div>Calls</div>
                </button>
                <button className='hover:bg-white '>
                    <div><InsertDriveFileOutlinedIcon /></div>
                    <div>Files</div>
                </button>

                <button className=''>
                    <div><HelpOutlineOutlinedIcon /></div>
                    <div>Help</div>
                </button>
            </div>

            <div className="onless1024px min-[746px]:hidden ">
                <div className="lowernavbar fixed bg-[#ebebeb] overflow-hidden  bottom-0 left-0 right-0 z-50">
                    <div className="flex justify-between h-14 border-t-[2px]  rounded-t-[2px]  space-x-9 shadow-lg px-7 ">
                        {currloc.includes("home") || currloc.includes("grp") ?
                            <Link to="/home">
                                <div className=" item1  text-[#444791] items-center" onClick={() => setgrpState("general")}>
                                    <GroupsOutlinedIcon className='ml-2' fontSize='medium' />
                                    <div className='text-[10px] ml-[6px]'>Teams</div>
                                </div>
                            </Link>
                            :
                            <Link to="/home">
                                <div className=" item1   items-center" onClick={() => setgrpState("general")}>
                                    <GroupsOutlinedIcon className='ml-2' fontSize='medium' />
                                    <div className='text-[10px] ml-[6px]'>Teams</div>
                                </div>
                            </Link>
                        }

                        {currloc.includes("assignment") || currloc.includes("grp") ?
                            <Link to="/assignment">
                                <div className=" item1  text-[#444791] items-center" onClick={() => setgrpState("general")}>
                                    <AssignmentOutlinedIcon className='ml-4' fontSize='medium' />
                                    <div className='text-[10px] ml-1'>Assignment</div>
                                </div>
                            </Link>
                            :
                            <Link to="/assignment">
                                <div className=" item1  items-center" onClick={() => setgrpState("general")}>
                                    <AssignmentOutlinedIcon className='ml-4' fontSize='medium' />
                                    <div className='text-[10px] ml-1'>Assignment</div>
                                </div>
                            </Link>
                        }


                        <Link to="/"><div className="item1">
                            <HomeOutlinedIcon fontSize='medium' />
                            <div className='text-[10px]'>Home</div>
                        </div></Link>

                        <div className="item1 items-center">
                            <GroupsOutlinedIcon className='ml-2' fontSize='medium' />
                            <div className='text-[10px]'>Trending</div>
                        </div>
                        {/* <div className="item1">
                            <PersonAddAltIcon className="ml-3" fontSize='medium' />
                            <div className='text-[10px]'>Following</div>
                        </div>
                        {localStorage.getItem('token') ? <div className="item1">
                            <AccountBoxOutlinedIcon fontSize='medium' />
                            <div className='text-[10px]'>Profile</div>
                        </div> :
                            <Link to="/login"><div className="item1">
                                <LoginOutlinedIcon fontSize='medium' />
                                <div className='text-[10px]'>Login</div>
                            </div></Link>}

                        <div className="item1">
                            <QuestionAnswerOutlinedIcon className='mx-1' fontSize='medium' />
                            <div className='text-[10px]'>Review</div>
                        </div>
                        <div className="item1">
                            <TourOutlinedIcon fontSize='medium' />
                            <div className='text-[10px]'>Tour</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
