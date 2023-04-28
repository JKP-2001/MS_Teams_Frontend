import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import view_student from "../../../Images/view-student-roster.svg"
import { getGrpDetails } from '../../../Redux/Group/groupSlice'

const EntryMessage = () => {

  const params = useParams();
  const id = params.id;

  const GrpState = useSelector((state)=> state.group);

  useEffect(()=>{
    getGrpDetails(id)
  },[])

  return (
    <div className="container min-[746px]:ml-[82px] mt-[200px] text-center justify-center min-[946px]:ml-[400px] min-[946px]:w-auto mb-2 " >
        <div className="text1 font-semibold text-2xl text-[#424242] mb-2 ml-auto mr-auto mx-3 ">
            Welcome to {GrpState.grpName}
        </div>
        <div className="text2 text-xl text-[#424242] ml-auto mr-auto mx-5">
        Try @mentioning the class name or student names to start a conversation.
        </div>
        <div className="text2 text-xl text-[#424242] w-[25%] h-[25%] ml-auto mr-auto py-6">
            <img src={view_student} alt="" />
        </div>
    </div>
  )
}

export default EntryMessage