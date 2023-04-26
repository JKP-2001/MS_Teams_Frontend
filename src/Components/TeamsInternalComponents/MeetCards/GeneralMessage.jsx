import React, { useState } from 'react'
import view_student from "../../../Images/view-student-roster.svg"
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
// import ReactHtmlParser from 'react-html-parser'
import { Markup } from 'interweave';
import parse from 'html-react-parser'
import { Dropdown } from 'flowbite-react';
import DropDownMenu from './DropDownMenu';
import FileInMeetCard from './FileInMeetCard';
import Item from './Item';




const GeneralMessage = (props) => {
    const [seeMore, setSeeMore] = useState(true);
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
                        {props.isOwner ? <div className='mt-3 mr-4'>
                            <DropDownMenu index={props.index} content={props.body} id={props.postid} isOwner={props.isOwner} isEdit={props.isEdit} />
                        </div> : null}
                    </div>
                    <div className="name px-3 border-black py-2 border-t-[0.2px] bg-white rounded-b-md"></div>
                    <div className="text break-words py-2 pt-[8px] px-3 rounded-t-md overflow-y-auto">
                        {seeMore && props.body.length > 500 ? parse(props.body.slice(0, 500) + '....') : parse(props.body)}
                        <div className='font-medium text-violet-800 mt-2 hover:cursor-pointer' onClick={() => setSeeMore(!seeMore)}>
                            {props.body.length > 500 ? seeMore ? "See More..." : "See Less" : null}
                        </div>
                    </div>
                    {/* <FileInMeetCard itemsArr = {props.itemsArr}/> */}
                    {props.itemsArr.length > 0 &&
                        <><hr />
                            {props.itemsArr.length>2?<div className='pb-2 mt-1 h-[100px] overflow-y-auto'>
                                {props.itemsArr.map((item, i) => {
                                    if (item.type === 'application/pdf') {
                                        return (<Item body={item.name} type={"pdf"} key={i} link={item.files} />)
                                    }
                                    else if (item.type === 'image/png') {
                                        return (<Item body={item.name} type={"img"} key={i} link={item.files} />)
                                    }
                                })}
                            </div>:<div className='pb-2 mt-1'>
                                {props.itemsArr.map((item, i) => {
                                    if (item.type === 'application/pdf') {
                                        return (<Item body={item.name} type={"pdf"} key={i} link={item.files} />)
                                    }
                                    else if (item.type === 'image/png') {
                                        return (<Item body={item.name} type={"img"} key={i} link={item.files} />)
                                    }
                                })}
                            </div>}
                        </>}
                </div>
                <div className="lower">
                    <div className="name px-3 py-2 border-t-[0.1px] bg-white rounded-b-md"><ReplyOutlinedIcon fontSize='small' /> Reply</div>
                </div>
            </div>
        </div>
    )
}

export default GeneralMessage