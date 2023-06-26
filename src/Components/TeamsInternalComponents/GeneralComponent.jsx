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
import { Socket } from '../../SocketClient'
import showToast from '../../Utils/showToast'

export default function GeneralComponent(props) {

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [topNav, setToNav] = useState(<GeneralNavBar />);
  const { grpState, deleteAssignment } = useContext(GrpContext);

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

    
    
  }, [Grpstate.assignmentPosted.length]);



  useEffect(()=>{
    Socket?.on("group message received",(data)=>{

      // console.log({id:grpid});
      // console.log({dataId:data.grpId});
      
      if(localStorage.getItem('currGrpId') && String(localStorage.getItem('currGrpId')) === String(data.grpId)){
        dispatch(getGrpItems(data.grpId));

        // const displayText = data.msg=="new"?"New post added":data.msg=="delete"?"Post Deleted":"Post Updated";
        // showToast({
        //   msg:displayText,
        //   duration:2000,
        //   type:"success"
        // })
        return;
      }

    });
  },[]);


  useEffect(()=>{
    Socket?.on("assignment received",(data)=>{

      // console.log({id:grpid});
      // console.log({dataId:data.grpId});
      
      if(localStorage.getItem('currGrpId') && String(localStorage.getItem('currGrpId')) === String(data.grpId)){
        dispatch(getAssignmentOfAGrp(data.grpId));
        
        // showToast({
        //   msg:"New Assignment Added or Updated",
        //   duration:2000,
        //   type:"success"
        // })

      }

      return;

    });
    return;
  },[]);


  useEffect(()=>{
    Socket?.on("member added to grp",(data)=>{
      if(localStorage.getItem('currGrpId') && String(localStorage.getItem('currGrpId')) === String(data.grpId)){
        dispatch(getMembers(data.grpId));
        // showToast({
        //   msg:`${data.email} Added`,
        //   duration:2000,
        //   type:"success"
        // })
      }
      return;
    });
  },[]);

  useEffect(()=>{
    Socket?.on("code resetted",(data)=>{
      if(localStorage.getItem('currGrpId') && String(localStorage.getItem('currGrpId')) === String(data.grpId)){
        dispatch(getGrpDetails(data.grpId));
        // showToast({
        //   msg:`${data.email} Added`,
        //   duration:2000,
        //   type:"success"
        // })
      }
      return;
    });
  },[]);

  


  

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
                {assignmentPosted? assignmentPosted.length==0?<div className='font-mono text-2xl ml-3'>No forthcoming Assignments to show.</div>:
                assignmentPosted.map((item,i)=>{
                  const date = new Date(item.dueDateTime);
                  // console.log({item});
                  return (<AssignmentCard key={i} ass_id={item._id} title={item.title} grp_name={Grpstate.grpName} dueDate={date.toLocaleDateString('en-GB',options)} dueTime={date.toLocaleTimeString('en-GB',{ hour: "2-digit", minute: "2-digit" })} postId={item._id} grpId={grpid} points={item.points?item.points:null} owner={item.createdBy} date={date} files={item.files} instruction={item.instructions} deadline={item.dueDateTime}/>)
                })
                
                :

                <button disabled type="button" class=" w-full  text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center justify-center">
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                <div className='text-center text-black text-2xl'>Loading...</div>
              </button>}
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
