import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import grp_icon from "../.././Images/grp_icon.jpg"

const AssignmentCard = (props) => {
  const [date, setDate] = useState();


  useEffect(() => {
    let date = new Date().toString();
    // date = date.toLocaleTimeString('en-GB',{ hour: "2-digit", minute: "2-digit" })
    setDate(date);
  }, [])


  return (
    <Link to={`/assignment/${props.grpId}/${props.postId}`}><div className="card my-[6px] rounded-xl bg-white hover:shadow-xl border-[3px] hover:cursor-pointer" >
      <div className=" flex item">
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
    </Link>
  )
}

export default AssignmentCard