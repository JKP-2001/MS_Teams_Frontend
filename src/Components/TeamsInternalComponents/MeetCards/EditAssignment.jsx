import React, { useContext, useEffect, useRef, useState } from 'react'
import GrpContext from '../../../Context/GrpContext/GrpContext';
import showToast from '../../../Utils/showToast';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import hljs from 'highlight.js';
import hljs from 'highlight.js'
// import 'react-quill/dist/quill.core.css'
// import 'react-quill/dist/quill.bubble.css'
// import 'highlight.js/styles/darcula.css'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteFromAssItemsArray, getAssignmentOfAGrp, getGrpItems } from '../../../Redux/Group/groupSlice';
import Item from './Item';
import { deleteFromPostItemsArray, getPostItemsArray } from '../../../Redux/Post/postSlice';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { deleteFromFileArray, fetchAssignment } from '../../../Redux/Assignment/assignmentSlice';

const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"];
Quill.register(Font, true);

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
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
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
];

const MAX_COUNT = 30;

const EditAssignment = (props) => {

    // const DATA = props.data;

    const params = useParams();

    const dispatch = useDispatch();
    
    const assState = useSelector((state)=>{
        return state.assignment;
    })

    

    // useEffect(() => {
    //     // dispatch(getPostItemsArray(props.index));
    //     const grpid = params.id;
    //     // dispatch(fetchAssignment(grpid,props.ass_id));
    //     // console.log({postState})
    // }, [ref])



    const grpstate = useSelector((state) => state.group);


    const [val,setVal] = useState(props.deadline);

    const { createGrpPost, createAGrp, editAGrpPost, editAssignment } = useContext(GrpContext);

    const { hidden, setHidden, toggleModal } = props;

    const [isPrivate, setPrivate] = useState(false);

    const [title, setTitle] = useState(props.title);
    const [inst, setInst] = useState(props.inst);
    


    const [data, setData] = useState({ grpName: '', desc: '' });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const [deletedItems, setDeleItem] = useState([]);

    const ref = useRef();

    const checkClick = () => {
        setPrivate(!isPrivate);
    }

    
    const id = params.id;

    
    // item_index={props.item_index}

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false; files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.unshift(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert('You can only add a maximum of ${MAX_COUNT} files');
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


    const handleSubmit = async () => {
        const response = await editAssignment(props.ass_id, title, inst,val,deletedItems, uploadedFiles);
        // id,title,instructions,deadline,deletedItems, uploadedFiles
        // window.scroll(0,0);
        toggleModal();
        setTitle(title);
        showToast({
            msg: "Post updated successfully.",
            type: "success",
            duration: 3000
        })
        setDeleItem([]);
        setUploadedFiles([]);
        dispatch(getGrpItems(id));
        dispatch(getAssignmentOfAGrp(id));
        // if(response.success){
        //     setValue(value);
        //     showToast({
        //         msg: "Post updated successfully.",
        //         type: "success",
        //         duration: 3000
        //     })
        // }
        // itemsArray = grpstate.grpItems.push(response);
    }
    const postState = useSelector((state) => state.post);

    const RemoveIcon = (i, type, path) => {
        if (type == "nup") {
            uploadedFiles.splice(i, 1)
            setUploadedFiles([...uploadedFiles]);
            ref.current.value = "";
        }
        else if (type == "up") {
            let arr = [...deletedItems];
            arr.push(path);
            setDeleItem(arr);
            dispatch(deleteFromFileArray(props.item_index,i));
            // dispatch(getPostItemsArray(props.index));
            // console.log({DelItem:deletedItems})
        }
    }

    const stopPro = (e) => {
        // e.stopPropagation();
        // dispatch(getPostItemsArray(props.index));
    }

    

    const handleCancel = () => {
        toggleModal();
        const id = params.id;
        dispatch(getAssignmentOfAGrp(id));
        setDeleItem([]);
    }

    


    

    useEffect(() => {
        ref.current.value = '';
        // console.log({DelItem:deletedItems})
    }, [uploadedFiles.length])


    // setTitle(assState.data.title);
    // setInst(assState.data.instructions)


    return (
        <>
            <div className={`fixed z-50 tabindex="-1" overflow-hidden h-auto top-0 w-full left-0 ${hidden}`} id="modal" >
                <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-900 opacity-75" />
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                    <div className="inline-block align-center bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full overflow-auto" role="dialog" aria-modal="true" aria-labelledby="modal-headline" >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className='text-[1.3rem] font-medium mb-3 leading-[1.33333rem]'>
                                Edit Assignment.
                            </div>
                            <div className='mb-2'>
                                <label className='text-sm font-[1.4rem] mb-2 '>Title</label>
                                <input type="text" className="w-full bg-gray-100 p-2 mt-2 mb-1 rounded-xl" name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className='flex justify-between'>
                                <label className='text-sm font-[1.4rem] mb-2'>Instruction</label>
                                {/* {title.length > 100000 ? <label className='text-sm font-[1.4rem] mr-[1rem] text-red-800'>Character limit reached</label> : null} */}
                            </div>
                            <div className='h-[150px] overflow-auto'>
                                <ReactQuill className=' bg-white border-b-violet-500 border-b-[3px] rounded-lg mb-3' theme="snow" value={inst} onChange={setInst} placeholder='Enter the instruction.' modules={modules}
                                    formats={formats} /></div>
                            <div className='mb-1'>
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
                        </div>

                        <div>
                            <input id='fileUpload' ref={ref} className='ml-8' type='file' multiple accept='application/pdf, image/png' onChange={handleFileEvent} disabled={fileLimit} /></div>

                        {/* {uploadedFiles.length > 0 || props.files.length > 0 ? <label htmlFor='fileUpload' className='ml-9'> <a className={`text-lg btn btn-primary ${!fileLimit ? '' : 'disabled'}`}>Upload Files</a></label> : null} */}

                        <div className="flex uploaded-files-list my-2 ml-9 h-[55px] overflow-auto">
                            {uploadedFiles.map((item, i) => {
                                if (item.type === 'application/pdf') {
                                    return (
                                        <div className="flex" key={i}>
                                            <Item body={item.name} type={"pdf"} />
                                            <CloseRoundedIcon className='hover:cursor-pointer' onClick={() => RemoveIcon(i, "nup", "")} />
                                        </div>)
                                    // <div>{item.name}</div>
                                }
                                else if (item.type === 'image/png') {
                                    return (
                                        <div className="flex" key={i}>
                                            <Item body={item.name} type={"img"} key={i} />
                                            <CloseRoundedIcon className='hover:cursor-pointer' onClick={() => RemoveIcon(i, "nup", "")} />
                                        </div>)
                                    // <div>{item.name}</div>
                                }

                            })}
                            {/* {console.log({items:uploadedFiles})} */}
                            {assState.files.map((item, i) => {
                                // console.log(item)
                                if (item.type === 'application/pdf') {
                                    return (
                                        <div className="flex mx-1" key={i}>
                                            {i + 1}. <Item body={item.name} type={"pdf"} key={i} link={item.files} />
                                            <CloseRoundedIcon className='hover:cursor-pointer' onClick={() => RemoveIcon(i, "up", item.files)} />
                                        </div>)
                                    // <div>{item.name}</div>
                                }
                                else if (item.type === 'image/png') {
                                    return (
                                        <div className="flex mx-1" key={i}>
                                            {i + 1}. <Item body={item.name} type={"img"} key={i} link={item.files} />
                                            <CloseRoundedIcon className='hover:cursor-pointer' onClick={() => RemoveIcon(i, "up", item.files)} />
                                        </div>)
                                    // <div>{item.name}</div>
                                }

                            })}
                        </div>

                        {/* <div className="uploaded-files-list mb-4">
                                {uploadedFiles.map(file => (
                                    <div >
                                        {file.name}
                                    </div>
                                ))}
                            </div> */}


                        <div className="bg-gray-200 px-4 py-3 text-right flex">
                            <button className="bg-[#5b5fc7] mb-3 mx-4 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={() => handleCancel()}>Cancel
                            </button>
                            {title !== '<p><br></p>' && title !== '' ? <button className="bg-[#5b5fc7] mb-2 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={() => handleSubmit()}>Post
                            </button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    // return(<h1>Hello</h1>)
}

export default EditAssignment