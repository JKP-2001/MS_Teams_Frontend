import React from 'react'
import Modal from './EditNotes'
import { useState } from 'react';
import parse from 'html-react-parser'
import { useSelector } from 'react-redux';

const NoteCard = (props) => {
    const [showModal, setShowModal] = useState(false);

    const noteState = useSelector(state => state.notes);
    
    const [date, setDate] = useState(new Date(noteState.data[props.ind].updatedAt).toDateString());
    const [time, setTime] = useState(new Date(noteState.data[props.ind].updatedAt).toLocaleTimeString().slice(0,5));

    return (
        <>
        <Modal showModal={showModal} setShowModal={setShowModal} title={props.title} desc={props.desc} note_id={props.note_id}/>
        <div className="rounded">
            <div className="w-auto h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                <div>
                    <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{parse(props.title)}</h4>
                    <p className="text-gray-800 dark:text-gray-100 text-sm break-all">{parse(props.desc)}</p>
                </div>
                <div>
                    <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
                        <p className="text-sm">{date}</p>
                        <button className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="edit note" role="button" onClick={()=>setShowModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                            </svg>
                        </button>
                    </div>
                    <p className="text-sm text-white">{time}</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default NoteCard