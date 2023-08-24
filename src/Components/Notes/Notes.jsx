import React, { useState } from 'react'
import NavbarCoponent from '../NavbarComponet/NavbarCoponent'
import SideBarComponent from '../SideBarComponent/SideBarComponent'
import Modal from './EditNotes'
import NoteCard from './NoteCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNote } from '../../Redux/Notes/notesSlice'
import { useContext } from 'react'
import GrpContext from '../../Context/GrpContext/GrpContext'
import AddNote from './AddNote'

const Notes = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNote());
    }, []);

    const noteState = useSelector(state => state.notes);

    const [showModal, setShowModal] = useState(false);

    



    return (
        
        noteState ? 
        <div>
            <AddNote showModal={showModal} setShowModal={setShowModal} />
            <div>
                < NavbarCoponent />
                <SideBarComponent />
                <div className={`min-[768px]:ml-[90px] mt-[60px] grid-cols-1 `}>
                    <div>
                        <div className="text-5xl font-semibold pt-5 text-center font-mono">
                            Notes
                        </div>

                        {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full float-right mr-3 mb-3 ">
                        Button
                        </button> */}
                    </div>



                    <div className="mx-auto container pt-10 pb-20 px-6">
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <div className="w-auto h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                                <div className="mt-24 text-center justify-between text-gray-800 dark:text-gray-100">
                                    <div className='hover:cursor-pointer hover:underline text-2xl' onClick={() => setShowModal(true)}>
                                        Add Note
                                    </div>
                                </div>
                            </div>
                            {noteState.data.map((note, i) => {
                                return (<NoteCard key={i} ind={i} title={note.title} desc={note.content} note_id={note._id} updatedAt={note.updatedAt} />)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div> : null
    )
}

export default Notes