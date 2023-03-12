import React, { useContext, useEffect } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import GS from "../../Images/GS.jpg"
import { Link, useParams } from 'react-router-dom';
import GrpContext from '../../Context/GrpContext/GrpContext';
import { getGrpDetails } from '../../Redux/Group/groupSlice';
import { useSelector } from 'react-redux';

const SideBar = () => {
  const {grpState,setgrpState,click,setClick} = useContext(GrpContext);
  const params = useParams();
  const id = params.id;

  const GrpState = useSelector((state)=> state.group);

  const clickAssign = ()=>{
    setClick('general')
    setgrpState("assignment");
    window.scrollTo(0, 0);
  }

  const clickGeneral = ()=>{
    setClick('assign')
    setgrpState("general");
  }

  const clickMember = ()=>{
    setClick('member')
    setgrpState("member");
  }

  useEffect(()=>{
    getGrpDetails(id)
  },[])

  return (
    <div className=" z-10 ml-[72px] mt-[48px] grid-cols-1 w-[300px] h-full fixed bg-[#f0f0f0] shadow-2xl  hidden min-[946px]:block">
      <div className="sidecompo mt-5 text-sm font-normal">
        <div className="back my-6 hover:cursor-pointer ml-[20px] text-[#616161]">
          <ChevronLeftIcon fontSize='small' /><Link to="/"> All Teams</Link>
        </div>
        <div className="icon ml-[20px] sclae-50">
          <img src={GS} alt="" className='rounded-md w-20 h-20' />
        </div>
        <div className="grp_name pt-7 pl-[20px] text-xl font-semibold">
          {GrpState.grpName}
        </div>
        <div className="gap pt-7">
        </div>
        <div className="icon">
          <div className="text py-[5px] text-[#616161] hover:bg-white hover:cursor-pointer hover:rounded-md hover:text-black pl-[25px]">Home Page</div>
          <div className="text py-[5px] text-[#616161] hover:bg-white hover:cursor-pointer hover:rounded-md  hover:text-black pl-[25px]">Class Notebook</div>
          {grpState!=="assignment"?<div className="text py-[5px] text-[#616161] hover:bg-white hover:cursor-pointer hover:rounded-md hover:text-black pl-[25px]" onClick={()=>clickAssign()}>Assignments</div>:<div className="text py-[5px] text-[#616161] bg-white hover:cursor-pointer hover:rounded-md hover:text-black pl-[25px]" onClick={()=>clickAssign()}>Assignments</div>}
          {grpState!=="member"?<div className="text py-[5px] text-[#616161] hover:bg-white hover:cursor-pointer hover:rounded-md hover:text-black pl-[25px]" onClick={()=>clickMember()}>Members</div>:<div className="text py-[5px] text-[#616161] bg-white hover:cursor-pointer hover:rounded-md hover:text-black pl-[25px]" onClick={()=>clickMember()}>Members</div>}
          <div className="text py-[5px] text-[#616161] hover:bg-white hover:cursor-pointer hover:rounded-md hover:text-black pl-[25px]">Grades</div>
        </div>
        <div className="gap pt-5">
          <hr className="my-2 md:my-0 h-[1.2px] ml-[20px] mr-[20px] bg-gray-50 border-0 dark:bg-gray-300"></hr>
        </div>
        <div className="grp_name pt-3 pl-[25px] text-sm font-semibold">
          Channels
        </div>
        {grpState!=="general"?<div className="gap pt-3">
          <div className="text py-[5px] text-[#616161] hover:bg-white hover:cursor-pointer hover:rounded-md pl-[25px]" onClick={()=>clickGeneral()}>General</div>
        </div>:<div className="gap pt-3">
          <div className="text py-[5px] text-[#616161] bg-white hover:cursor-pointer hover:rounded-md pl-[25px]" onClick={()=>clickGeneral()}>General</div>
        </div>}
        
      </div>
    </div>
  )
}

export default SideBar