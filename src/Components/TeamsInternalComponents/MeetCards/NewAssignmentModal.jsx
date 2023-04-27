import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import GrpContext from '../../../Context/GrpContext/GrpContext';
import showToast from '../../../Utils/showToast';


import 'react-quill/dist/quill.snow.css';
import ClearIcon from '@mui/icons-material/Clear';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import hljs from 'highlight.js'
import { getAssignmentOfAGrp, getGrpItems } from '../../../Redux/Group/groupSlice';
import { RemoveCircleOutline } from '@mui/icons-material';
import Item from './Item';

import DateTimePicker from 'react-datetime-picker';
import BasicDateTimePicker from '../../BasicDateTimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"];
Quill.register(Font, true);

const modules = {
    toolbar: [
        [{ header: [false] }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        ["link"],
    ],
};

const formats = [

    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "indent",
    "link",
    "color",
    "background",
];

const MAX_COUNT = 5;

const NewAssignmentModal = (props) => {

    const [val, setVal] = useState(null);
    var today = new Date();



    // get the date and time
    var now = '';

    useEffect(() => {
        now = today.toISOString();
        setVal((now));
    }, [])




    // if (val) {
    //     console.log({ "info": val.$d })
    //     var event = new Date(val.$d);
    //     let date = JSON.stringify(event)
    //     // console.log({date})
    //     var isoDateTime = date.substring(1, 25);
    //     console.log({ date: isoDateTime })
    // }


    const grpstate = useSelector((state) => state.group);

    const { createGrpPost, createAGrp, postAssignment } = useContext(GrpContext);

    const { hidden, setHidden, toggleModal } = props;

    const [isPrivate, setPrivate] = useState(false);
    const [value, setValue] = useState('');

    const [data, setData] = useState({ title: '' });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const ref = useRef();
    const reset = () => {
        ref.current.value = "";
    };



    const checkClick = () => {
        setPrivate(!isPrivate);
    }

    const params = useParams();
    const id = params.id;

    // console.log({id})
    const dispatch = useDispatch();

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false; files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    showToast({
                        msg: `You can only add a maximum of ${MAX_COUNT} file`,
                        type: "error"
                    })
                    ref.current.value = "";
                    // alert('You can only add a maximum of ${MAX_COUNT} files');
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
    }

    const clickOutside = e => {
        e.stopPropagation();

    }

    const RemoveIcon = (i) => {
        uploadedFiles.splice(i, 1)
        setUploadedFiles([...uploadedFiles]);
        ref.current.value = "";
    }




    const handleCancel = () => {
        toggleModal();
        setUploadedFiles([]);
        setValue('');
        setData({ title: '' });
        now = today.toISOString();
        setVal((now));
    }


    const handleSubmit = async () => {
        var event = new Date(val.$d);
        let date = JSON.stringify(event)
        var isoDateTime = date.substring(1, 25);
        setLoading(true);
        const response = await postAssignment(id, data.title, value, isoDateTime, uploadedFiles);
        setLoading(false);
        dispatch(getAssignmentOfAGrp(id));
        setValue('');
        // window.scroll(0,0);
        toggleModal();
        showToast({
            msg: "Assignment posted successfully.",
            type: "success",
            duration: 3000
        })
        ref.current.value = "";
        setUploadedFiles([]);
        setData({ title: "" });
        now = today.toISOString();
        setVal((now));
        window.scrollTo({
            top: document.documentElement.scrollHeight,
        });
        // itemsArray = grpstate.grpItems.push(response);
    }

    useEffect(() => {
        ref.current.value = '';
    }, [uploadedFiles.length])

    return (
        <>
            <div className={`fixed z-50 tabindex="-1"  top-0 w-full left-0 ${hidden}`} id="modal" >
                <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-900 opacity-75" />
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                    <div className="inline-block align-center bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full max-h-[100vh-200px] " role="dialog" aria-modal="true" aria-labelledby="modal-headline" onClick={clickOutside}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className='text-[1.3rem] font-medium mb-3 leading-[1.33333rem]'>
                                New Assignment
                            </div>
                            <p className='text-xs'>
                                Create a new assignment for the group.
                            </p>
                        </div>

                        <div className='bg-white px-6 overflow-y-scroll h-[80%]'>
                            <div className="overflow-y-auto">
                                <div className='mb-2'><label className='text-sm font-[1.4rem] mb-2 '>Title</label>
                                    <input type="text" className="w-full bg-gray-100 p-2 mt-2 mb-1 rounded-xl" name='title' value={data.title} onChange={handleChange} /></div>

                                <div className='flex justify-between'>
                                    <label className='text-sm font-[1.4rem] mb-2'>Instructions</label>
                                    {value.length > 10000 ? <label className='text-sm font-[1.4rem] mr-[1rem] text-red-800'>Character limit reached</label> : null}
                                </div>
                                {value.length > 100 ?
                                    <div className='h-[150px] overflow-auto'>
                                        <ReactQuill className=' bg-gray-100 border-b-violet-500 border-b-[3px] rounded-lg mb-3' theme="snow" value={value} onChange={setValue} placeholder='Enter the instructions.' modules={modules}
                                            formats={formats} />
                                    </div> :
                                    <div className='overflow-auto'>
                                        <ReactQuill className=' bg-gray-100 border-b-violet-500 border-b-[3px] rounded-lg mb-3' theme="snow" value={value} onChange={setValue} placeholder='Enter the instructions.' modules={modules}
                                            formats={formats} />
                                    </div>}
                                <div className='mb-2'>
                                    {/* <BasicDateTimePicker /> */}
                                    <DemoContainer
                                        components={[
                                            'MobileDateTimePicker',
                                        ]}>
                                        <DemoItem label="Deadline">
                                            <MobileDateTimePicker className='bg-gray-100' ampm={false} value={dayjs(val)} onChange={(newValue) => setVal(newValue)} />
                                        </DemoItem>
                                    </DemoContainer>

                                </div>
                                <input id='fileUpload' className='w-full mt-2 mb-2 bg-gray-100 display:block border-slate-400 border rounded-lg' type='file' multiple accept='application/pdf, image/png' onChange={handleFileEvent} disabled={fileLimit} title="Attach File" ref={ref} />

                                {/* {uploadedFiles.length > 0 ? <label htmlFor='fileUpload' className='ml-9'> <a className={`text-lg btn btn-primary ${!fileLimit ? '' : 'disabled'}`}>Refrence Materials</a></label> : null} */}

                                {/* <div className="uploaded-files-list mb-4 ml-9">
                                
                                {uploadedFiles.map((file,i) => (
                                    <div className='flex' key={i}>
                                        {i+1}. {file.name}
                                        <CloseRoundedIcon onClick={()=>RemoveIcon(i)}/>
                                    </div>
                                ))}
                            </div> */}

                                {uploadedFiles.length > 0 ?
                                    <div className={`flex uploaded-files-list mb-4 ml-9 overflow-y-auto`}>
                                        {/* {uploadedFiles.length > 0 ? <label htmlFor='fileUpload' className='ml-9'> <a className={`text-lg btn btn-primary ${!fileLimit ? '' : 'disabled'}`}>Materials</a></label> : null} */}
                                        {uploadedFiles.map((item, i) => {
                                            if (item.type === 'application/pdf') {
                                                return (<div className='flex' key={i}>
                                                    {i+1}. <Item body={item.name} type={"pdf"} key={i} />
                                                    <CloseRoundedIcon className='hover:cursor-pointer' onClick={() => RemoveIcon(i)} />
                                                </div>)
                                            }
                                            else if (item.type === 'image/png') {
                                                return (<div className='flex' key={i}>
                                                    {i+1}. <Item body={item.name} type={"img"} key={i} />
                                                    <CloseRoundedIcon className='hover:cursor-pointer' onClick={() => RemoveIcon(i)} />
                                                </div>)

                                            }
                                        })}
                                    </div> :
                                    <div className={`uploaded-files-list mb-4 ml-9 overflow-auto`}>
                                        {uploadedFiles.map((item, i) => {
                                            if (item.type === 'application/pdf') {
                                                return (<div className='flex' key={i}>
                                                    <Item body={item.name} type={"pdf"} key={i} />
                                                    <CloseRoundedIcon className='hover:cursor-pointer' onClick={() => RemoveIcon(i)} />
                                                </div>)
                                            }
                                            else if (item.type === 'image/png') {
                                                return (<div className='flex' key={i}>
                                                    <Item body={item.name} type={"img"} key={i} />
                                                    <CloseRoundedIcon className='hover:cursor-pointer' onClick={() => RemoveIcon(i)} />
                                                </div>)

                                            }
                                        })}
                                    </div>
                                }
                            </div>
                        </div>



                        <div className="bg-gray-200 px-4 py-3 text-right">
                            <button className="bg-[#5b5fc7] mb-3 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={() => handleCancel()}>Cancel
                            </button>
                            {data.title.length!==0? 
                            !loading ? <button className="bg-[#5b5fc7] mb-2 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={() => handleSubmit()}>Post
                            </button> : <button disabled type="button" class="bg-[#5b5fc7] mb-3 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px] inline-flex items-center justify-center">
                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                <div className='text-center'>Loading...</div>
                            </button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewAssignmentModal