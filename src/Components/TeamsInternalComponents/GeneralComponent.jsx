import React, { useContext, useEffect, useState } from 'react'
import NavbarCoponent from '../NavbarComponet/NavbarCoponent'
import SideBarComponent from '../SideBarComponent/SideBarComponent'
import Cards from '../NavbarComponet/Cards'
import SecondNav from '../NavbarComponet/SecondNav'
import Posts from './Posts'
import SideBar from './SideBar'
import GS from "../.././Images/GS.jpg"
import MeetEnded from './MeetCards/MeetEnded'
import EntryMessage from './MeetCards/EntryMessage'
import GeneralMessage from './MeetCards/GeneralMessage'
import MeetingCard from './MeetCards/MeetingCard'
import FileInMeetCard from './MeetCards/FileInMeetCard'
import GoToTop from '../GoToTop'
import GoToBottom from '../GoToBottom'
import GeneralNavBar from './MeetCards/GeneralNavBar'
import GeneralContent from './MeetCards/GeneralContent'
import GrpContext from '../../Context/GrpContext/GrpContext'
import AssignmentCard from './AssignmentCard'
import { getGrpDetails, getMembers } from '../../Redux/Group/groupSlice'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MemberCard from './MeetCards/MemberCard'
import arrow from "../../Images/rightarrow.png"
import AllMembers from './MeetCards/AllMembers'

export default function GeneralComponent(props) {

  const [topNav, setToNav] = useState(<GeneralNavBar />);
  const { grpState } = useContext(GrpContext);

  const [isassign, setIsAssign] = useState(false);

  const GrpState = useSelector((state) => state.group);


  const params = useParams();
  const grpid = params.id;
  const dispatch = useDispatch();



  const clickAssign = () => {
    setIsAssign(true);
    window.scrollTo(0, 0);
  }

  const clickCompleted = () => {
    setIsAssign(false);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    dispatch(getGrpDetails(grpid));
    dispatch(getMembers(grpid));
  }, [grpState])

  return (
    <div>
      <NavbarCoponent />
      <div className="flex">
        <div>
          <SideBarComponent />
        </div>
        {topNav}
      </div>
      <div className="entrymessage ">
        {grpState === "general" ? <EntryMessage /> :
        
          grpState === "assignment" ?
            <div className='container pl-[100px] pt-[90px] min-[946px]:pt-[130px]  min-[946px]:pl-[400px] mb-2 pr-10 w-screen'>
              <div className="flex space-x-4 pt-3 pl-2 ">
                {isassign ? <div className="assigned">
                  <span className='text-[#444791] text-sm font-semibold cursor-pointer border-b-[3px] border-indigo-500' onClick={() => clickAssign()}>Assigned</span>
                </div> : <div className="assigned">
                  <span className='text-black text-sm font-base cursor-pointer hover:border-b-[3px] ' onClick={() => clickAssign()}>Assigned</span>
                </div>}
                {!isassign ? <div className="completed">
                  <span className='text-[#444791] text-sm font-semibold cursor-pointer border-b-[3px]  border-indigo-500' onClick={() => clickCompleted()}>Completed</span>
                </div> : <div className="completed">
                  <span className='text-black text-sm font-base cursor-pointer hover:border-b-[3px]  ' onClick={() => clickCompleted()}>Completed</span>
                </div>}
              </div>
              {isassign ? <div className="">
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
                <AssignmentCard />
              </div> : <div className="">
                <AssignmentCard />
                <AssignmentCard />
              </div>}
            </div> :

            <AllMembers id={grpid} />
        }
        {grpState === "general" ? <GeneralContent /> : <div className="cards ml-[150px] w-[70%] min-[946px]:ml-[450px] mb-4"><h1></h1></div>}
      </div>
    </div>
  )
}
