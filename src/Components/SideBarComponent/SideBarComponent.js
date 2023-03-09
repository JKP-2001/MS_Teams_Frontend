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

import { useDispatch } from 'react-redux';


export default function SideBarComponent() {
    
    const navigate=useNavigate();

    const dispatch = useDispatch();

    const {setgrpState} = useContext(GrpContext);
    const location = useLocation();
    const [currloc,setCurrloc] = useState("");

    const getCurLoc = ()=>{
        setCurrloc(location.pathname);
    }
    useEffect(() => {
        // Update the document title using the browser API
        getCurLoc();
      });


  return (
    
    <div style={{backgroundColor:'#ebebeb'}} className='fixed top-[48px] bottom-[0px] text-center text-[10px] w-[72px] grid gap-2 -z-1'>
        <button className='mt-8 w-full hover:bg-white'>
            <div><NotificationsActiveOutlinedIcon/></div>
            <div>Activity</div>
        </button>
        <button className='hover:bg-white ' onClick={()=>{navigate("/chats")}}>
            <div><ChatBubbleOutlineOutlinedIcon/></div>
            <div>Chats</div>
        </button>
        {currloc.includes("home") || currloc.includes("grp") ? <button className='bg-white text-[#444791]' onClick={()=>setgrpState("general")}>
            <Link to="/home"><div><GroupsOutlinedIcon/></div>
            <div className='text-[#444791] font-bold '>Teams</div></Link>
        </button>:<button className='hover:bg-white hover:text-[#444791]' onClick={()=>setgrpState("general")}>
            <Link to="/home" onClick={()=>setgrpState("general")}><div><GroupsOutlinedIcon/></div>
            <div className=''>Teams</div></Link>
        </button>}
        
        {currloc.includes("assignment")?<button className='bg-white text-[#444791]'>
            <Link to="/assignment"><div ><AssignmentOutlinedIcon/></div></Link>
            <div className='text-[#444791] font-bold '>Assignments</div>
        </button>:<button className='hover:bg-white hover:text-[#444791]'>
            <Link to="/assignment"><div ><AssignmentOutlinedIcon/></div>
            <div className=''>Assignments</div></Link>
        </button>   }

        <button className='hover:bg-white '>
            <div><CalendarMonthOutlinedIcon/></div>
            <div>Calendar</div>
        </button>
        <button className='hover:bg-white '>
            <div><CallOutlinedIcon/></div>
            <div>Calls</div>
        </button>
        <button className='hover:bg-white '>
            <div><InsertDriveFileOutlinedIcon/></div>
            <div>Files</div>
        </button>

        <button className=''>
            <div><HelpOutlineOutlinedIcon/></div>
            <div>Help</div>
        </button>
    </div>
  )
}
