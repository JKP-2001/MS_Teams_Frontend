
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

    const bottomRef = useRef(null);

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
    

    useEffect(() => {

        bottomRef.current?.scrollIntoView();

    }, []);

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
                <div ref={bottomRef} />
            </>)
    }   
    else{
        return <button disabled type="button" class=" w-full  text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center justify-center">
    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
    </svg>
    <div className='text-center text-black text-2xl'>Loading...</div>
  </button>
    }
}

export default GeneralContent


