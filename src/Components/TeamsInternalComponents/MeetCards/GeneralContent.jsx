
import React, { useContext, useEffect, useRef, useState } from 'react'
// import Cards from '../../NavbarComponet/Cards'
import SecondNav from "../../NavbarComponet/SecondNav"
import Posts from '../Posts'
import SideBar from "../SideBar"
import GS from "../../../Images/GS.jpg"
import MeetEnded from './MeetEnded'
import EntryMessage from './EntryMessage'
import GeneralMessage from './GeneralMessage'
import MeetingCard from './MeetingCard'
import AssignmentCard from './AssignmentCard'
import FileInMeetCard from './FileInMeetCard'
import GoToBottom from '../../GoToBottom'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useParams } from 'react-router-dom'
import GrpContext from '../../../Context/GrpContext/GrpContext'
import { useDispatch, useSelector } from 'react-redux'
import { getGrpItems } from '../../../Redux/Group/groupSlice'
import NewPostCard from './NewPostCard'
import { getUserProfile } from '../../../Redux/authentication/authSlice'


const GeneralContent = (props) => {
    const {createGrpPost} = useContext(GrpContext)
    const grpstate = useSelector((state)=> state.group);
    let itemsArray = grpstate.grpItems;
    const onTop = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
          });
      }
    
      useEffect(() => {
        onTop()
    }, []);

    useEffect(()=>{
        dispatch(getGrpItems(id));
        dispatch(getUserProfile());
    },[])


    const [value, setValue] = useState('');
    const [isConver, setIsConver] = useState(false);

    const wrapperRef = useRef(null);
    const params = useParams();
    const id = params.id;

    // console.log({id})
    const dispatch = useDispatch();

    const setConFunc = ()=>{
        setIsConver(true);
        window.scrollTo({ left: 0, top: document.body.scrollHeight});
    }

    // const handleSubmit = async ()=>{
    //     const response = await createGrpPost(id,value);
    //     dispatch(getGrpItems(id));
    //     setIsConver(false);
    //     setValue('');
    //     // window.scroll(0,0);
    //     window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    //     // itemsArray = grpstate.grpItems.push(response);
    // }


    const [hidden, setHidden] = useState('hidden');

    const toggleModal = () => {
        if (hidden === 'hidden') {
          setHidden('');
        } else {
          setHidden('hidden');
        }
      }
    
      
    
      const authstate = useSelector((state)=> state.auth);
    // below is the same as componentDidMount and componentDidUnmount
    
    if(authstate.data && grpstate.grpItems && grpstate.owner){
        
        return (
            <>
            <div className="cards ml-[120px] min-[550px]:ml-[150px] w-[70%]  min-[946px]:ml-[400px] min-[946px]:w-auto mb-4 content-center">
                    {itemsArray.map((item) => {
                        if (item.meetTitle) {
                            return (<MeetingCard key={item._id} meetTitle={item.meetTitle} meetDate={item.meetDateTime.split("T")[0]} meetTime={item.meetDateTime.slice(11, 16)} firstName={item.owner.firstName} lastName={item.owner.lastName}/>)
                        }
                        else if (item.content) {
                            return (<GeneralMessage key={item._id} postid={item._id} body={item.content} postDate={item.details.timeDate.slice(0, 10)} postTime={item.details.timeDate.slice(11, 16)} firstName={item.owner.firstName} lastName={item.owner.lastName} isOwner={item.owner.email === authstate.data.email || grpstate.admins.includes(authstate.data._id) || authstate.data._id === grpstate.owner._id} isEdit={item.owner.email === authstate.data.email} />)
                        }
                    })}
                    {/* <AssignmentCard />
                <MeetingCard />
                <MeetingCard />
                <AssignmentCard /> */}
    
                    {/* <FileInMeetCard /> */}
                    <button className="bg-[#5b5fc7] mb-3 ml-10 md:ml-10 hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-auto" onClick={()=> toggleModal()}>New Conversation</button>
                    <NewPostCard hidden={hidden} setHidden={setHidden} toggleModal={toggleModal}/>
                    {/* {!isConver ?
                        <button className="bg-[#5b5fc7] mb-3 ml-10 md:ml-10 hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-auto" onClick={setConFunc}>New Conversation</button> : <><div className="flex"><ReactQuill className='ml-9 bg-white border-b-violet-500 border-[3px] rounded-lg min-[946px]:w-[85%] pb-[2.5rem]' theme="snow" value={value} onChange={setValue} placeholder='Start a new conversation.' /><SendOutlinedIcon className='ml-2 mt-[10rem] min-[425px]:mt-[6.5rem] hover:cursor-pointer ' onClick={handleSubmit}/></div></>} */}
                </div>
                <GoToBottom />
            </>)
    }   
    return <h1>Loading</h1>;
}

export default GeneralContent



{/* <MeetEnded body={"Meeting in General ended: 2m 20s"} />
            <GeneralMessage body={"Dear Students, Quiz 1 will be posted on teams tomorrow morning at 9 AM in the form of teams assignment. You need to upload the scanned copy of your hand written solution on teams. The submission will be open for 1 hour (till 10 AM). Late submissions will attract penalty of marks. It will be a closed book exam. The syllabus is till fluid statics. You need to be online on the teams during the quiz since attendance will be taken. You may be asked to switch on your camera."} />
            <MeetEnded body={"General ended: 16m 34s"} />
            <MeetingCard />
            <MeetEnded body={"Meeting in General ended: 2m 20s"} />
            <MeetEnded body={"Meeting Ended"} />
            <AssignmentCard />
            <MeetingCard />
            <AssignmentCard />
            <GeneralMessage body={"Dear Students, Quiz 1 will be posted on teams tomorrow morning at 9 AM in the form of teams assignment. You need to upload the scanned copy of your hand written solution on teams. The submission will be open for 1 hour (till 10 AM). Late submissions will attract penalty of marks. It will be a closed book exam. The syllabus is till fluid statics. You need to be online on the teams during the quiz since attendance will be taken. You may be asked to switch on your camera."} />
            <MeetEnded body={"Meeting in General ended: 2m 20s"} />
            <MeetingCard />
<GeneralMessage body={"Dear Students,The mid-semester exam of ME214 (Fluid Mechanics I) will be held on 23 Sept (Tomorrow) 2021 from 9 AM to 11 AM.Please refer to the academic section guidelines for the exam https://google.com The exam will be held in the form of an MS Teams assignment where you need to submit your handwritten solution (As it was done for quiz 1).Both sections A and B are divided into 3 groups each for conducting a total of 6 (3+3) parallel sessions for conducting the exam. You can find your group in the excel sheet. Each session will be proctored and you need to keep your camera ON during the examination period. Your face should be visible in the live camera feed for the complete duration of the exam.Note that it will be a closed book exam."} /> */}