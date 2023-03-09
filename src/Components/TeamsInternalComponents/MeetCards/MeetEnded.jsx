import React from 'react'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

const MeetEnded = (props) => {
    return (
        <div className="flex min-[946px]:w-[90%]">
            <div className="image mr-2">
                <VideocamOutlinedIcon fontSize='small' />
            </div>

            <div className="container mr-2 m-auto m-h-12 rounded-md mb-8">
                <div className="upper bg-white">
                    <div className="text py-2  m-h-10 pt-[8px]  px-3 rounded-t-md">{props.body}
                    </div>
                </div>
                <div className="lower bg-white">
                    <div className="name px-3 py-2 border-t-[0.1px] bg-white "><ReplyOutlinedIcon fontSize='small'/> Reply</div>
                </div>
            </div>
        </div>
    )
}

export default MeetEnded