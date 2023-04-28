
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
            <div className="cards min-[746px]:ml-[120px] mx-4 min-[746px]:w-full  min-[946px]:ml-[400px] min-[946px]:w-auto mb-4 content-center items-center">
                    {itemsArray.map((item,i) => {
                        if (item.meetTitle) {
                            return (<MeetingCard key={item._id} meetTitle={item.meetTitle} meetDate={item.meetDateTime.split("T")[0]} meetTime={item.meetDateTime.slice(11, 16)} firstName={item.owner.firstName} lastName={item.owner.lastName}/>)
                        }
                        else if (item.content) {
                            var dateTime = new Date(item.details.timeDate);
                            // console.log({date:item.details.timeDate})
                            return (<GeneralMessage key={item._id} index={i} postid={item._id} body={item.content} postDate={dateTime.toLocaleDateString('en-GB')} postTime={dateTime.toLocaleTimeString('en-GB',{hour: "2-digit", minute: "2-digit" })} firstName={item.owner.firstName} lastName={item.owner.lastName} isOwner={item.owner.email === authstate.data.email || grpstate.admins.includes(authstate.data._id) || authstate.data._id === grpstate.owner._id} isEdit={item.owner.email === authstate.data.email} itemsArr={item.files}/>)
                        }
                    })}
                    {/* <AssignmentCard />
                <MeetingCard />
                <MeetingCard />
                <AssignmentCard /> */}
    
                    {/* <FileInMeetCard /> */}
                    <button className="bg-[#5b5fc7] mb-16 ml-10 md:ml-10 hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-auto " onClick={()=> toggleModal()}>New Conversation</button>
                    <NewPostCard hidden={hidden} setHidden={setHidden} toggleModal={toggleModal}/>
                    {/* {!isConver ?
                        <button className="bg-[#5b5fc7] mb-3 ml-10 md:ml-10 hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-auto" onClick={setConFunc}>New Conversation</button> : <><div className="flex"><ReactQuill className='ml-9 bg-white border-b-violet-500 border-[3px] rounded-lg min-[946px]:w-[85%] pb-[2.5rem]' theme="snow" value={value} onChange={setValue} placeholder='Start a new conversation.' /><SendOutlinedIcon className='ml-2 mt-[10rem] min-[425px]:mt-[6.5rem] hover:cursor-pointer ' onClick={handleSubmit}/></div></>} */}
                </div>
                {/* <div className="border-2 shadow-md bg-[#f5f5f5] container fixed bottom-0ml-[120px] min-[550px]:ml-[150px] w-screen  min-[946px]:ml-[350px] min-[946px]:w-screen  content-center">
                    <button className=" bg-[#5b5fc7] mb-3 ml-10 md:ml-10  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-auto" onClick={() => toggleModal()}>New Conversation</button>
                    <NewPostCard hidden={hidden} setHidden={setHidden} toggleModal={toggleModal} />
                </div> */}
                <GoToBottom />
            </>)
    }   
    return <h1>Loading</h1>;
}

export default GeneralContent


