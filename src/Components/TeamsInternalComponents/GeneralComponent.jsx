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
import { getAssignmentOfAGrp, getGrpDetails, getGrpItems, getMembers } from '../../Redux/Group/groupSlice'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MemberCard from './MeetCards/MemberCard'
import arrow from "../../Images/rightarrow.png"
import AllMembers from './MeetCards/AllMembers'
import AssignmentForm from './MeetCards/AssignmentForm'
import ReactForm from './MeetCards/ReactForm'
import NewAssignmentModal from './MeetCards/NewAssignmentModal'

export default function GeneralComponent(props) {

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [topNav, setToNav] = useState(<GeneralNavBar />);
  const { grpState } = useContext(GrpContext);

  const [isassign, setIsAssign] = useState(false);
  const [iscreate, setIsCreate] = useState(false);

  const params = useParams();
  const grpid = params.id;
  const dispatch = useDispatch();

  const Grpstate = useSelector((state) => state.group);
  let assignmentPosted = Grpstate.assignmentPosted;
  const authstate = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getGrpDetails(grpid));
    dispatch(getMembers(grpid));
    dispatch(getAssignmentOfAGrp(grpid));
    setIsAssign(true)
    
  }, [Grpstate.assignmentPosted.length])

  

  const clickAssign = () => {
    setIsAssign(true);
    window.scrollTo(0, 0);
  }


  const clickCompleted = () => {
    setIsAssign(false);
    window.scrollTo(0, 0);
  }

  const clickAssignCreate = () => {
    setIsCreate(true);
    setIsAssign(false);
  }

  const [hidden, setHidden] = useState('hidden');

  const toggleModal = () => {
    if (hidden === 'hidden') {
      setHidden('');
    } else {
      setHidden('hidden');
    }
  }

  // console.log({GrpState:Grpstate.assignmentPosted})

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

            // <div >
            //   <ReactForm /></div> :
            <div className='min-[713px]:pl-[100px] pt-[90px] min-[946px]:pt-[130px]  min-[946px]:pl-[400px] mb-2 min-[746px]:pr-10 w-auto mx-3'>
              {Grpstate.adminsEmail.includes(authstate.data.email) || authstate.data.email === Grpstate.owner.email ?
                <div className="flex space-x-4 pt-3 px-4 justify-between">
                  {isassign ? <div className="assigned">
                    <span className='text-[#444791] text-sm font-semibold cursor-pointer border-b-[3px] border-indigo-500' onClick={() => clickAssign()}>Assigned</span>
                  </div> : <div className="assigned">
                    <span className='text-black text-sm font-base cursor-pointer hover:border-b-[3px] ' onClick={() => clickAssign()}>Assigned</span>
                  </div>}
                  {!isassign ? <div className="completed">
                    <span className='text-[#444791] text-sm font-semibold cursor-pointer border-b-[3px]  border-indigo-500' onClick={() => clickCompleted()}>Completed</span>
                  </div> : <div className="completed">
                    <span className='text-black text-sm font-base cursor-pointer hover:border-b-[3px]' onClick={() => clickCompleted()}>Completed</span>
                  </div>
                  }
                  <button className="bg-[#5b5fc7] mx-2 md:mx-3  hover:bg-blue-700 text-white font-normal  mr-3  border border-blue-700 rounded w-[144.72px] h-7 mb-4" onClick={()=> toggleModal()}>Create</button>
                </div>
                //   <span className='text-[#444791] text-sm font-semibold cursor-pointer border-b-[3px] border-indigo-500' onClick={() => clickAssignCreate()}>Assigned</span>
                //   <span className='text-[#444791] text-sm font-semibold cursor-pointer border-b-[3px] border-indigo-500' onClick={() => clickAssign()}>Create</span>
                // </div>
                : <div className="flex space-x-4 pt-3 pl-2 ">
                  {isassign ? <div className="assigned">
                    <span className='text-[#444791] text-sm font-semibold cursor-pointer border-b-[3px] border-indigo-500' onClick={() => clickAssign()}>Assigned</span>
                  </div> : <div className="assigned">
                    <span className='text-black text-sm font-base cursor-pointer hover:border-b-[3px] ' onClick={() => clickAssign()}>Assigned</span>
                  </div>}
                  {!isassign ? <div className="completed">
                    <span className='text-[#444791] text-sm font-semibold cursor-pointer border-b-[3px]  border-indigo-500' onClick={() => clickCompleted()}>Completed</span>
                  </div> : <div className="completed">
                    <span className='text-black text-sm font-base cursor-pointer hover:border-b-[3px]  ' onClick={() => clickCompleted()}>Completed</span>
                  </div>
                  }
                </div>
              }
              {isassign ? <div className="w-full mt-6 px-4 pb-20">
                {/* <AssignmentCard />
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
                <AssignmentCard /> */}
                {assignmentPosted.length==0?<div className='font-mono text-2xl ml-3'>No forthcoming Assignments to show.</div>:
                assignmentPosted.map((item,i)=>{
                  const date = new Date(item.dueDateTime);
                  return (<AssignmentCard key={i} title={item.title} grp_name={Grpstate.grpName} dueDate={date.toLocaleDateString('en-GB',options)} dueTime={date.toLocaleTimeString('en-GB',{ hour: "2-digit", minute: "2-digit" })} postId={item._id} grpId={grpid} points={item.points?item.points:null} date={date}/>)
                })}
              </div> : <div className="pt-3 pb-20">
                {/* <AssignmentCard />
                <AssignmentCard /> */}
                <div className='font-mono text-2xl ml-3'>No Completed Assignments to show.</div>
              </div>}
            </div> :
            <AllMembers id={grpid} />
        }
        {grpState === "general" ? <GeneralContent itemsArray={Grpstate.grpItems} /> : null}
        {/* {grpState === "general" ? <AssignmentForm /> : null} */}
      </div>
      <NewAssignmentModal hidden={hidden} setHidden={setHidden} toggleModal={toggleModal} />
    </div>
  )
}
