import React from 'react'
import view_student from "../../../Images/view-student-roster.svg"
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';


const GeneralMessage = (props) => {
    return (
        <div className="flex min-[946px]:w-[90%]">
            <div className="image mr-2">
                <PersonOutlinedIcon fontSize='medium' />
            </div>

            <div className="container mr-2 m-auto m-h-12 rounded-md mb-8">
                <div className="upper bg-white">
                    <div className="flex">
                        <div className="authorname pl-3 pt-1 font-semibold">
                            JKP_6957
                        </div>
                        <div className="date pt-[5.55px] pl-4 font-normal text-sm">
                                31/08/2021, 14:41
                        </div>
                    </div>
                    <div className="text py-2  m-h-10 pt-[8px]  px-3 rounded-t-md">{props.body}
                    </div>
                </div>
                <div className="lower">
                    <div className="name px-3 py-2 border-t-[0.1px] bg-white rounded-b-md"><ReplyOutlinedIcon fontSize='small' /> Reply</div>
                </div>
            </div>
        </div>
    )
}

export default GeneralMessage