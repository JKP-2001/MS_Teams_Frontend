import React from "react";
import { useContext } from "react";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import GrpContext from "../../Context/GrpContext/GrpContext";
import showToast from "../../Utils/showToast";
import { duration } from "moment";
import { toast } from "react-hot-toast";
import { fetchNote } from "../../Redux/Notes/notesSlice";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Modal(props) {

    const {editNote} = useContext(GrpContext);
    
    const showModal = props.showModal;
    const setShowModal = props.setShowModal;

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    // const notesState = useSelector(state => state.notes);

    // const ind = props.ind;

    const [title, setTitle] = useState(props.title);
    const [desc, setDesc] = useState(props.desc);

    const changeTitle = (e)=>{
        setTitle(e.target.value);
    }

    

    const handleEdit = async ()=>{
        setLoading(true);
        const result = await editNote(props.note_id,title,desc);
        setLoading(false);
        setShowModal(false);

        if(!result.success){
            showToast({
                msg:"Error in updating note",
                type:"error",
                duration:3000
            })
        }
        else{
            dispatch(fetchNote());
            showToast({
                msg:"Notes updated successfully",
                type:"success",
                duration:3000
            })
            window.location.reload(true);
        }
    }

    
    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto md:w-1/3  my-6 mx-auto ">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                                
                                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                   
                                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Update Note
                                            </h3>
                                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal" onClick={()=>{setShowModal(false); setTitle(props.title); setDesc(props.desc)}}>
                                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>
                     
                                        <div>
                                            <div className="gap-4 mb-4 sm:grid-cols-2">
                                                <div className="my-3">
                                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                                    <input type="text" name="name" id="name" value={title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={changeTitle} placeholder="Ex. Apple iMac 27&ldquo;"/>
                                                </div>
                                                {/* <div className="my-3">
                                                    <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                                    <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                        <option selected="">Electronics</option>
                                                        <option value="TV">TV/Monitors</option>
                                                        <option value="PC">PC</option>
                                                        <option value="GA">Gaming/Console</option>
                                                        <option value="PH">Phones</option>
                                                    </select>
                                                </div> */}
                                                <div className="sm:col-span-2 rounded-md">
                                                    <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                    <ReactQuill className=' text-white' theme="snow"  value={desc} onChange={setDesc} />;
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <button  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleEdit}>
                                                    {loading?"Updating ...":"Update product"}
                                                </button>
                                                <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=>{setShowModal(false); setTitle(props.title); setDesc(props.desc)}}>
                                                    <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
