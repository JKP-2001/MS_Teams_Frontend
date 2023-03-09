import React from 'react'
import { Link } from 'react-router-dom'
import grp_icon from "../.././Images/grp_icon.jpg"

const AssignmentCard = () => {
  return (
    <Link to="/assignment/lp"><div className="card my-2 rounded-xl bg-white hover:shadow-xl border-[3px] hover:cursor-pointer" >
        <div className=" flex item">
            <div className="grp_image mx-4 pt-[32px]">
                <div className="account"><img className="rounded-2xl" src={grp_icon} alt="" /></div>
            </div>
            <div className="title py-[24px]">
                <h3 className='font-medium text-md md:text-xl'>1st Assignment on Casting and Joining Processing</h3>
                <div className="date mt-1"> <span className="text-[#737373]">Grp_XYZ</span><span className='text-[#c4314b]'><div></div> Due 13-Apr-2022 23:59</span></div>
            </div>

        </div>
    </div>
    </Link>
  )
}

export default AssignmentCard