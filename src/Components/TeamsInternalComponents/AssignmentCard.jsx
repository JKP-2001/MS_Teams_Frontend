import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import grp_icon from "../.././Images/grp_icon.jpg"
import GrpContext from '../../Context/GrpContext/GrpContext';
import MemberDropDown from './MeetCards/MemeberDropDown';
import AssignmentDropDown from './MeetCards/AssignmentDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from '../../SocketClient';

const AssignmentCard = (props) => {
  const [date, setDate] = useState();
  const { deleteAssignment } = useContext(GrpContext);

  const navigate = useNavigate();

  useEffect(() => {
    let date = new Date().toString();
    // date = date.toLocaleTimeString('en-GB',{ hour: "2-digit", minute: "2-digit" })
    setDate(date);
  }, [])

  const ass_id = props.postId;
  const owner = props.owner;
  
  const handleClick = ()=>{
    localStorage.setItem("currAss",props.postId);
    navigate(`/assignment/${props.grpId}/${props.postId}`);
    Socket.emit("open assignment",{assId:props.postId});
  }

  return (
    <div className="relative card my-[6px] rounded-xl bg-white hover:shadow-xl border-[3px] hover:cursor-pointer" onClick={handleClick}>
      <div className="absolute flex justify-between right-2">
        <div></div>
        {props.postId ? <AssignmentDropDown ass_id={props.ass_id} owner={owner} deadline={props.deadline} title={props.title} files={props.files} inst={props.instruction}/> : null}
      </div>
  
        <div className="flex item">
          <div className="grp_image mx-4 pt-[32px]">
            <div className="account"><img className="rounded-2xl " src={grp_icon} alt="" /></div>
          </div>
          <div className="title py-[10px]">
            <h3 className='font-medium text-md md:text-xl break-all pr-2'>{props.title}</h3>
            <div className="date mt-1"> <span className="text-[#737373]">{props.grp_name}</span>
              <span className='text-[#c4314b] flex'><div></div> {new Date(props.date) < new Date(date) ? <div className='font-semibold'>Past Due</div> : <div className=''>Due</div>}{", " + props.dueDate}, {props.dueTime}.</span></div>
          </div>
        </div>
    </div>
  )
}

export default AssignmentCard