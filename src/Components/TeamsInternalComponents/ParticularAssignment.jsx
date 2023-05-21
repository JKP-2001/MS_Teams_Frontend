import React, { useContext, useEffect, useState } from 'react'
import NavbarCoponent from '../NavbarComponet/NavbarCoponent'
import SideBarComponent from '../SideBarComponent/SideBarComponent'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, useParams } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';


import AssignmentMaterial from './AssignmentMaterial';
import GrpContext from '../../Context/GrpContext/GrpContext';
import Item from './MeetCards/Item';
import parse from "html-react-parser"
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignment } from '../../Redux/Assignment/assignmentSlice';
import { getUserProfile } from '../../Redux/authentication/authSlice';

const ParticularAssignment = () => {

    const dispatch = useDispatch();
    const params = useParams();
    
    const [see, setSee] = useState(false);

    useEffect(()=>{
        dispatch(fetchAssignment(params.grpid,params.postid))
        dispatch(getUserProfile());
        setSee(true);
    },[])

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    
    const { getAssignmentById } = useContext(GrpContext);
    

    

    const [seeMore, setSeeMore] = useState(true);
    
    // const grpId = params.grpid;
    // const postId = params.postid; 

    const [assState, setAssState] = useState(null);

    const setTheState = async () => {
        const json = await getAssignmentById(params.grpid, params.postid)
        setAssState(json.details);
    }
    let date;
    

    // useEffect(() => {
    //     // setTheState();
    //     console.log({AssignmentState})
    //     dispatch(fetchAssignment(params.grpid, params.postid))
    // },[])

    const AssignmentState = useSelector((state)=> state.assignment)
    const UserState = useSelector((state)=> state.auth)
    // console.log({UserState})
    if (AssignmentState.data) {
        date = new Date(AssignmentState.data.dueDateTime);
    }
    

    if (AssignmentState.data && see) {
        return (
            <div>
                <NavbarCoponent />
                <div>
                    <SideBarComponent />
                </div>
                <div className="flex md-[746px]:ml-[30px] ml-2 mt-[48px] bg-[#f5f5f5] justify-between">
                    {/* <div ><SecondNav/></div> */}

                    <div className="back pt-8 min-[746px]:pl-14">
                        <span className='text-[#6064c9] font-semibold text-base font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif]'><Link to={`/grp/${params.grpid}`}><ChevronLeftIcon fontSize='large' /> <span>Back</span></Link></span>
                    </div>

                    {AssignmentState.data.createdBy!==UserState.data._id?
                    <div className="back pt-[26px] md:pt-[22px] pl-4 order-last justify-end pr-32">
                        <button type="button" className="text-white bg-[#5b5fc7] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 pb:12 dark:bg-[#5b5fc7] dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Turn In</button>
                    </div>:null}
                </div>

                <div className="min-[746px]:ml-[30px]  bg-[#f5f5f5]  justify-center items-center pb-32">
                    {/* <div ><SecondNav/></div> */}
                    <div className=" px-5 justify-center items-center ">
                        <div className="flex space-x-8">
                            <div className="back pt-4 min-[746px]:pl-16 w-[100%] md:w-[60%]">
                                <div className='text-black font-semibold font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] text-2xl pb-3 md:pb-0 md:text-3xl' ><span>{AssignmentState.data.title}</span></div>
                                <div className='text-[#737373] font-base font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] ' ><span className='text-blue-600'>Due {date.toLocaleDateString('en-GB', options)} {date.toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" })}</span></div>
                                <div className='pt-4' ><span></span></div>
                                <div className='text-[#737373] font-semibold font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] ' ><span>Instructions</span></div>
                                <div className='text-[#737373] font-base font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] ' >
                                <span className='text-inherit'/>
                                {parse(AssignmentState.data.instructions).length==0?"none":parse(AssignmentState.data.instructions)}
                                </div>
                                <div className='pt-2' ><span></span></div>
                                {AssignmentState.data.files.length>0?<div className='my-2 font-semibold font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] text-[#737373]' ><span className='text-inherit'>Reference materials</span></div>:null}
                                {AssignmentState.data.files.map((item, i) => {
                                    if (item.type === 'application/pdf') {
                                        return (<AssignmentMaterial body={item.name} type={"pdf"} key={i} link={item.files} />)
                                    }
                                    else if (item.type === 'image/png') {
                                        return (<AssignmentMaterial body={item.name} type={"img"} key={i} link={item.files} />)
                                    }
                                })}
                                
                                <div className='pt-2' ><span></span></div>
                                {/* <r className='mb-2'></hr> */}
                                {AssignmentState.data.createdBy!==UserState.data._id?
                                <>
                                <div className='my-2 font-semibold font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] text-[#737373]' ><span className='text-inherit'>My Work</span></div>
                                <AssignmentMaterial />
                                
                                <div className="flex pt-2 pb-10">
                                    <div className="attach hover:cursor-pointer">
                                        <AttachFileIcon fontSize='small' /> <span className='text-[#5b5fc7] font-semibold text-sm'>Attach</span>
                                    </div>
                                </div></>:null}

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
    else{
        return(<div>
            Hello
        </div>)
    }
}

export default ParticularAssignment