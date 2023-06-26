import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { fetchAssignment, getLoginUserData, getSubInfo } from '../../Redux/Assignment/assignmentSlice';
import { getUserAssignments, getUserProfile, setLoading } from '../../Redux/authentication/authSlice';
import { getAssignmentOfAGrp, getGrpDetails, getMembers, setToInitial } from '../../Redux/Group/groupSlice';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TurnInItem from './MeetCards/TurnInItem';
import showToast from '../../Utils/showToast';
import SubmissionCard from './MeetCards/SubmissionCard';
import AuthState from '../../Context/AuthContext/AuthState';
import { toast } from 'react-hot-toast';
import { Socket } from '../../SocketClient';


const MAX_COUNT = 5;

const ParticularAssignment = () => {

    const dispatch = useDispatch();
    const params = useParams();

    const ref = useRef();

    const [see, setSee] = useState(false);

    const [isAdminOfGrp, setIsAdmin] = useState(false);

    const AssignmentState = useSelector((state) => state.assignment)
    const UserState = useSelector((state) => state.auth)
    const grpState = useSelector((state) => state.group)

    const [checkSub, setCheckSub] = useState(false);


    const fetchLogDetail = async () => {
        while (!UserState) {
        }
        dispatch(getLoginUserData(params.postid, UserState.data._id));
    }





    useEffect(() => {
        dispatch(getUserProfile());
        dispatch(getMembers(params.grpid));
        dispatch(getGrpDetails(params.grpid));
        dispatch(fetchAssignment(params.grpid, params.postid))
        fetchLogDetail();
        dispatch(getSubInfo(params.postid));
        // if(AssignmentState.data && UserState  && AssignmentState.data.createdBy === UserState.data._id){
        //     dispatch(getSubInfo(params.postid));
        // }
        setSee(true);
        // dispatch(setToInitial());
    }, [])


    useEffect(() => {
        

        
            
        console.log('it runs');

        Socket?.on("Assignment Submit",(data)=>{

            console.log({data});

            if(data.assId === params.postid){
                dispatch(getSubInfo(data.assId));
            }
        })
    },[]);


    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };


    const { getAssignmentById, turnInAssignment, turnOffAssignment } = useContext(GrpContext);


    const ASSIGN_STATE = useSelector((state) => state.assignment);



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


    // console.log({UserState})
    if (AssignmentState.data) {
        date = new Date(AssignmentState.data.dueDateTime);
    }





    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false; files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.unshift(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded);
    }
    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files); handleUploadFiles(chosenFiles);
        ref.current.value = '';
    }

    // useEffect(() => {
    //     ref.current.value = '';
    // }, [uploadedFiles.length])

    const RemoveIcon = (i) => {
        uploadedFiles.splice(i, 1)
        setUploadedFiles([...uploadedFiles]);
        ref.current.value = "";
    }


    const handleCancel = () => {
        setUploadedFiles([]);
        // setValue('');
        // setData({ title: '' });
        // now = today.toISOString();
        // setVal((now));
    }

    const handleTurnIn = async () => {

        // var event = new Date(val.$d);
        // let date = JSON.stringify(event)
        // var isoDateTime = date.substring(1, 25);
        const id = params.postid;

        setLoading(true);
        const result = turnInAssignment(id, uploadedFiles);

        // const result = addAdmin(props.grpid, props.email);

        toast.promise(result, {
            loading: 'Loading ...',
            success: (data) => {
                if (!data.success) {
                    // showToast({
                    //     msg: "File too large or Assignment already turned In.",
                    //     type: "error",
                    //     duration: 3000
                    // })
                    // setLoading(false);
                    return "File too large or Assignment already turned In.";
                };

                // dispatch(getGrpItems(id));
                // dispatch(getMembers(props.grpid));
                // return `${props.email} added to admin.`;

                setLoading(false);
                dispatch(getAssignmentOfAGrp(id));
                dispatch(getLoginUserData(params.postid, UserState.data._id));
                // setValue('');
                // window.scroll(0,0);
                // showToast({
                //     msg: "Turned In Successfully.",
                //     type: "success",
                //     duration: 3000
                // })
                ref.current.value = "";
                setUploadedFiles([]);
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                });

                Socket.emit('assignment submit',{assId:id})

                return "Turn in successfully.";
            },
            error: 'Uh oh, there was an error!',
            duration: 1000
        });



        // if (!response) {
        //     showToast({
        //         msg: "File too large or Assignment already turned In.",
        //         type: "error",
        //         duration: 3000
        //     })
        //     setLoading(false);
        //     return;
        // }
    }

    const handleTurnOff = async () => {
        const id = params.postid;

        const loadingToast = toast.loading('Loading...');

        const response = await turnOffAssignment(id);
        console.log({ response })

        if (response.success) {

            Socket.emit('assignment submit',{assId:id})

            toast.success('Turn off successfully.', {
                id: loadingToast,
            });

            
            setLoading(false);
            dispatch(getAssignmentOfAGrp(id));
            dispatch(getLoginUserData(params.postid, UserState.data._id));
            ref.current.value = "";
            setUploadedFiles([]);
            window.scrollTo({
                top: document.documentElement.scrollHeight,
            });
            

        }
        else {
            toast.error('Error Occured.', {
                id: loadingToast,
            });
        }
    }

    




    if (AssignmentState.data && UserState.data && grpState) {
        return (
            <div>
                <NavbarCoponent />
                <div>
                    <SideBarComponent />
                </div>

                <div className='min-[746px]:pr-40'>
                    <div className="flex md-[746px]:ml-[30px] ml-2 mt-[48px] bg-[#f5f5f5] justify-between">
                        {/* <div ><SecondNav/></div> */}

                        <div className="back pt-8 min-[746px]:pl-14">
                            <span className='text-[#6064c9] font-semibold text-base font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif]'><Link to={`/assignment`}><ChevronLeftIcon fontSize='large' /> <span>Back</span></Link></span>
                        </div>

                        {(AssignmentState.data.createdBy !== UserState.data._id) && !grpState.adminsEmail.includes(UserState.data.email) ?
                            <div className="back pt-[26px] md:pt-[22px] pl-4 order-last justify-end pr-32">
                                <button type="button" className="text-white bg-[#5b5fc7] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 pb:12 dark:bg-[#5b5fc7] dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={!AssignmentState.logginUserData ? handleTurnIn : handleTurnOff}>{!AssignmentState.logginUserData ? "Turn In" : "Turn Off"}</button>
                            </div> : AssignmentState.data.createdBy === UserState.data._id ?
                                <div className="back pt-[26px] md:pt-[22px] pl-4 order-last justify-end pr-32 relative">
                                    <button type="button" className="text-white bg-[#5b5fc7] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 pb:12 dark:bg-[#5b5fc7] dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 absolute max-[746px]:top-3 max-[746px]:right-0" onClick={() => setCheckSub(!checkSub)}>{!checkSub ? "Check " : "Back"}</button>
                                </div> : null}
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
                                        <span className='text-inherit' />
                                        {parse(AssignmentState.data.instructions).length == 0 ? "none" : parse(AssignmentState.data.instructions)}
                                    </div>
                                    <div className='pt-2' ><span></span></div>
                                    {AssignmentState.data.files.length > 0 ? <div className='my-2 font-semibold font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] text-[#737373]' ><span className='text-inherit'>Reference materials</span></div> : null}
                                    {AssignmentState.data.files.map((item, i) => {
                                        if (item.type === 'application/pdf') {
                                            return (<AssignmentMaterial body={item.name} type={"pdf"} key={i} link={item.files} />)
                                        }
                                        else if (item.type === 'image/png') {
                                            return (<AssignmentMaterial body={item.name} type={"img"} key={i} link={item.files} />)
                                        }
                                    })}

                                    {!checkSub ? <>
                                        <div className='pt-2' ><span></span></div>

                                        {AssignmentState.data.createdBy !== UserState.data._id ?
                                            <>
                                                <div className='my-2 font-semibold font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] text-[#737373]' ><span className='text-inherit'>{AssignmentState.logginUserData ? "My Work"
                                                    : ""}</span></div>
                                                {AssignmentState.logginUserData ?
                                                    AssignmentState.logginUserData.material.map((item, i) => {
                                                        if (item.type === 'application/pdf') {
                                                            return (<div className='flex' key={i}>
                                                                <TurnInItem body={item.name} type={"pdf"} key={i} close={false} link={item.files} />
                                                            </div>)
                                                        }
                                                        else if (item.type === 'image/png') {
                                                            return (<div className='flex' key={i}>
                                                                <TurnInItem body={item.name} type={"img"} key={i} close={false} link={item.files} />
                                                            </div>)

                                                        }
                                                    }) : null
                                                }

                                                <div className="flex pt-2 pb-5">
                                                    <div className="attach hover:cursor-pointer">
                                                        {!AssignmentState.logginUserData && !grpState.adminsEmail.includes(UserState.data.email) ?
                                                            <>
                                                                <AttachFileIcon fontSize='small' /> <span className='text-[#5b5fc7] font-semibold text-sm'>Attach</span></> : null}
                                                        {!AssignmentState.logginUserData && !grpState.adminsEmail.includes(UserState.data.email) ? <input id='fileUpload' className='w-full mt-2 mb-2 bg-gray-100 display:block border-slate-400 border rounded-lg' type='file' multiple accept='application/pdf, image/png' onChange={handleFileEvent} disabled={fileLimit} title="Attach File" ref={ref} /> : null}

                                                    </div>
                                                </div></> : null}

                                        {uploadedFiles.length > 0 ?
                                            <div className={`  `}>
                                                {/* {uploadedFiles.length > 0 ? <label htmlFor='fileUpload' className='ml-9'> <a className={`text-lg btn btn-primary ${!fileLimit ? '' : 'disabled'}`}>Materials</a></label> : null} */}
                                                {uploadedFiles.map((item, i) => {
                                                    if (item.type === 'application/pdf') {
                                                        return (<div className='flex' key={i}>
                                                            <TurnInItem body={item.name} type={"pdf"} key={i} RemoveIcon={RemoveIcon} i={i} close={true} />
                                                        </div>)
                                                    }
                                                    else if (item.type === 'image/png') {
                                                        return (<div className='flex' key={i}>
                                                            <TurnInItem body={item.name} type={"img"} key={i} close={true} />
                                                        </div>)

                                                    }
                                                })}
                                            </div> :
                                            <div className={` mb-4 ml-9`}>
                                                {uploadedFiles.map((item, i) => {
                                                    if (item.type === 'application/pdf') {
                                                        return (<div className='flex' key={i}>
                                                            <TurnInItem body={item.name} type={"pdf"} key={i} close={true} />
                                                        </div>)
                                                    }
                                                    else if (item.type === 'image/png') {
                                                        return (<div className='flex' key={i}>
                                                            <TurnInItem body={item.name} type={"img"} key={i} close={true} />
                                                        </div>)

                                                    }
                                                })}
                                            </div>
                                        }
                                    </> :
                                        <>
                                            <div className='text-lg ml-2 font-semibold'>Turn In By</div>
                                            <div className="container">
                                                <div className="flex flex-wrap">
                                                    {AssignmentState && AssignmentState.submissionInfo ?
                                                        AssignmentState.submissionInfo.turnInBy.map((mem) => {
                                                            return (<SubmissionCard user_id={mem._id} key={mem._id} name={mem.firstName + ' ' + mem.lastName} email={mem.email} />)
                                                        }) : null}
                                                    <hr className='pb-2' />
                                                </div>
                                            </div>
                                            <hr className='pb-2' />
                                            <div className='text-lg ml-2 font-semibold'>Not Turn In By</div>
                                            <div className="container mb-28">
                                                <div className="flex flex-wrap">
                                                    {AssignmentState && AssignmentState.submissionInfo ?
                                                        AssignmentState.submissionInfo.notTurnInBy.map((mem) => {
                                                            return (<SubmissionCard user_id={mem._id} key={mem._id} name={mem.firstName + ' ' + mem.lastName} email={mem.email} />)
                                                        }) : null}
                                                    <hr className='pb-2' />
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
    else {
        return (<div>
            Hello
        </div>)
    }
}

export default ParticularAssignment