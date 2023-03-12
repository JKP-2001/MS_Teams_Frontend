import React from 'react'
import view_student from "../../../Images/view-student-roster.svg"
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
// import ReactHtmlParser from 'react-html-parser'
import { Markup } from 'interweave';
import parse from 'html-react-parser'
import { Dropdown } from 'flowbite-react';
import DropDownMenu from './DropDownMenu';




const GeneralMessage = (props) => {
    return (
        <div className="flex min-[946px]:w-[90%]">
            <div className="image mr-2">
                <PersonOutlinedIcon fontSize='medium' />
            </div>

            <div className="container mr-2 m-auto m-h-12 rounded-md mb-8">
                <div className="upper bg-white border-l-4 border-violet-600 rounded-t-md">
                    <div className="flex justify-between">
                        <div className="authorname pl-3  font-semibold">
                            {props.firstName} {props.lastName}
                            <div className="date pb-1  font-normal text-sm">
                            {props.postDate}, {props.postTime}
                        </div>
                        </div>
                        {props.isOwner?<div className='mt-3 mr-4'>
                            <DropDownMenu content={props.body} id={props.postid} isOwner={props.isOwner} isEdit={props.isEdit}/>
                        </div>:null}
                    </div>
                    <div className="name px-3 border-black py-2 border-t-[0.2px] bg-white rounded-b-md"></div>
                    <div className="text break-words py-2 pt-[8px] overflow-auto  px-3 rounded-t-md overflow-y-auto">
                        {parse(props.body)}
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