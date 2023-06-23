// import { Label } from '@mui/icons-material'
import React, { useState } from 'react'

import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import Messages from './Messages';

const Conversation = () => {
    const [showMessage, setShowMessge] = useState(false)

    return (
        showMessage ? <div className='flex justify-center items-center  fixed top-[48px] left-[20px] md:left-[395px] right-4 h-[90vh] bg-[#ebebeb70]'>
            <div className='text-[30px] md:text-[36px] text-center font-medium '>
                Start Conversation
            </div>
        </div> :

            <div id='conversation' className='fixed top-[60px] left-[20px] md:left-[450px] right-4 h-[100vh] bg-[#ffffff] border-[3px] rounded-lg shadow-lg'>
                <div id='conversationTop' className='flex items-center border-b-[1px] border-gray-300 h-[65px]'>
                    <div className='flex w-1/2  items-center space-x-3'>
                        <img className='h-[40px] w-[43px] rounded-full ml-3 cursor-pointer' src={"https://picsum.photos/32/32/?random"}  alt="Lakshya" />
                        <div className='font-medium text-[20px] cursor-pointer'>{"JPP" + " " + "Pandey"}</div>
                    </div>
                    <div className='w-1/2 flex justify-end '>
                        <div className='border-[.5px]  px-[10px] border-[gray] cursor-pointer rounded-md bg-white mr-[10px]'>
                            <VideocamOutlinedIcon />
                        </div>
                        <div className='border-[.5px] px-[10px] border-[gray] cursor-pointer rounded-md bg-white mr-[10px]'>
                            <CallOutlinedIcon />
                        </div>
                    </div>
                </div>
                <div id='conversatioMid' className='pl-10 md:pl-20 pr-[60px] md:pr-[85px]' style={{ "overflowY": "auto", "height": "calc(100vh - 242.2px)" }}>
                    {/* {
                        messages.map((m) => {
                            return <div key={m._id} ref={scrollRef}><Message own={m.senderId === user.id ? true : false} m={m} /></div>
                        })
                    } */}
                    <Messages own={true} />
                    <Messages own={false} />
                    <Messages own={true} />
                    <Messages own={false} />
                    <Messages own={true} />
                    <Messages own={false} />
                    <Messages own={true} />
                    <Messages own={true} />
                    <Messages own={true} />
                    <Messages own={true} />
                    <Messages own={true} />
                    <Messages own={false} />
                    <Messages own={true} />
                    <Messages own={false} />
                    <Messages own={true} />
                    <Messages own={false} />

                    
                    <div id='conversationBottom' className='pl-10 md:pl-20 pr-[140px] md:pr-[480px] fixed bottom-14 md:bottom-0 right-0 left-[75px]  md:left-[430px] w-full border-gray-300 pt-8 '>
                    <div id='conversationBottomTop' style={{ "border": "1px solid #abaaaa", "borderRadius": "8px" }}>
                        <input type="text" className='w-full  border-1 h-10 outline-none bg-white px-3 focus:border-b-2 border-[#444791]' style={{ "borderRadius": "8px" }} placeholder="Type a new message" />
                    </div>
                    <div id='conversationBottomBottom ' className='flex pt-2 pb-4 justify-between'>
                        <div className="flex items-center space-x-5">
                            <label htmlFor="file" className="cursor-pointer">
                                <PermMedia htmlColor="black" className="" />
                                <input style={{ display: "none" }} type="file" id="file" name="file" accept=".png,.jpeg,.jpg" />
                            </label>
                            <div className="cursor-pointer">
                                <Label htmlColor="black" className="" />
                            </div>
                            <div className="cursor-pointer">
                                <Room htmlColor="black" className="shareOptionIcon" />

                            </div>
                            <div className="cursor-pointer">
                                <EmojiEmotions htmlColor="black" className="" />
                            </div>
                        </div>
                        <div  className='cursor-pointer'>
                            <SendOutlinedIcon />
                        </div>
                    </div>
                </div>
                </div>
            </div>
    )
}

export default Conversation