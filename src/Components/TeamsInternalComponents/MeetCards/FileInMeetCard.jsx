import React from 'react'

import ReplyOutlinedIcon from '@mui/icons-material/Reply';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Item from './Item';

const FileInMeetCard = () => {
    return (
        <div className="flex min-[946px]:w-[90%] mr-8 min-[946px]:mr-0">
            <div className="image mr-2">
                <PersonOutlinedIcon fontSize='small' />
            </div>

            <div className="container mx-2 m-auto m-h-12 rounded-md mb-8">
                <div className="upper bg-white mr-2">
                    <div className="flex">
                        <div className="authorname pl-3 pt-1 font-semibold">
                            JKP_6957
                        </div>
                        <div className="date pt-[5.55px] pl-4 font-normal text-sm">
                            31/08/2021, 14:41
                        </div>
                    </div>

                    
                    <Item body={"ME214_content_grading_books_shedule"} type={"pdf"}/>
                    <Item body={"ME214_content_grading_books_shedule"} type={"pdf"}/>
                    <Item body={"ME214_content_grading_books_shedule"} type={"pdf"}/>
                    <Item body={"ME214_content_grading_books_shedule"} type={"pdf"}/>
                    <Item body={"ME214_content_grading_books_shedule"} type={"pdf"}/>
                    <Item body={"ME214_content_grading_books_shedule"} type={"pdf"}/>
                    <Item body={"ME214_content_grading_books_shedule"} type={"pdf"}/>
                    <Item body={"ME214_content_grading_books_shedule"} type={"pdf"}/>
                    
                    
                </div>
                <div className="lower">
                    <div className="name px-3 py-2 mr-2 border-t-[0.1px] bg-white rounded-b-md"><ReplyOutlinedIcon fontSize='small' /> Reply</div>
                </div>
            </div>
        </div>
    )
}

export default FileInMeetCard