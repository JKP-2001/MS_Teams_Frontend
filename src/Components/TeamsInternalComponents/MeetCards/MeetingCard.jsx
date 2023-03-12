import React from 'react'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CalendarTodaySharpIcon from '@mui/icons-material/CalendarTodaySharp';

const MeetingCard = (props) => {
    return (
        <div className="flex min-[946px]:w-[90%]">
            <div className="image mr-2">
                <PersonOutlinedIcon fontSize='medium' />
            </div>

            <div className="container  m-h-12 rounded-md mb-8">
                <div className="upper bg-white">
                    <div className="flex">
                        <div className="authorname pl-3 pt-1 font-semibold">
                            {props.firstName} {props.lastNamez}
                        </div>
                        <div className="date pt-[5.55px] pl-4 font-normal text-sm">
                            31/08/2021, 14:41
                        </div>
                    </div>
                    <div className="msg text-base pl-3 mt-1 mb-2">
                        Scheduled a Meeting
                    </div>
                    <div className="flex bg-[#444791]">
                        <div className="icon pl-3 pt-[15px] ml-3">
                            <CalendarTodaySharpIcon color="warning"/>
                        </div>
                        <div className="details">
                        <div className="msg pl-3 pt-2 text-white text-base">
                            {/* Quiz 2 ME 214 (Section A Group 1) */}
                            {props.meetTitle}
                        </div>
                        <div className="msg text-sm pl-3  text-white">
                            {/* Tuesday, 2 November 2021 @ 08:55 */}
                            Date: {props.meetDate}
                        </div>
                        <div className="msg text-sm pl-3 pb-2 text-white">
                            {/* Tuesday, 2 November 2021 @ 08:55 */}
                            Time: {props.meetTime}
                        </div>

                        </div>
                    </div>
                </div>
                <div className="lower">
                    <div className="name px-3 py-2 border-t-[0.1px] bg-white rounded-b-md"><ReplyOutlinedIcon fontSize='small' /> Reply</div>
                </div>
            </div>
        </div>
    )
}

export default MeetingCard