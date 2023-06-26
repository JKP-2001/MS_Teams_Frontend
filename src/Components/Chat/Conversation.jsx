// import { Label } from '@mui/icons-material'
import React, { useState } from 'react'

import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';

import { Textarea } from "@material-tailwind/react";
import MessageBox from './MessageBox';
import { useRef } from 'react';
import { useEffect } from 'react';
import { setMessages } from '../../Redux/SearchUser/searchUserSlice';
import { io } from 'socket.io-client';
import Lottie from "lottie-react";


import animationData from "./Typing.json"

import GoToBottom from '../GoToBottom';





const Conversation = (props) => {
    const [showMessage, setShowMessge] = useState(false)

    // const [typing, setTyping] = useState(false);
    // const [isTyping, setIsTyping] = useState(false);

    const typing = props.typing;
    const setTyping = props.setTyping;
    const isTyping = props.isTyping;
    const setIsTyping = props.setIsTyping;


    const chatState = useSelector((state) => state.searchedUsers);

    const UserState = useSelector((state) => state.auth);

    const bottomRef = useRef(null);

    // console.log({bottomRef})

    const dispatch = useDispatch();

    // const options = {
    //     animationData:animationData ,
    //     loop: true
    //   };

    //   const { View } = useLottie(options);


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };







    useEffect(() => {

        bottomRef.current?.scrollIntoView();

    }, [chatState.messages]);




    return (
        !chatState.currentOpenChat || !UserState.data ? <div className='flex justify-center items-center  fixed top-[48px] left-[20px] md:left-[450px] right-4 h-[90vh] bg-[#ebebeb70]'>
            <div className='text-[30px] md:text-[36px] text-center font-medium '>
                Start Conversation
            </div>
        </div> :

            <div id='conversation' className='fixed top-[60px] left-[20px] md:left-[450px] right-4 h-[100vh] bg-[#ffffff] border-[3px] rounded-lg shadow-lg'>
                <div id='conversationTop' className='flex items-center border-b-[1px] border-gray-300 h-[65px]'>
                    <div className='flex w-1/2  items-center space-x-3'>
                        <img className='h-[40px] w-[43px] rounded-full ml-3 cursor-pointer' src={"https://picsum.photos/32/32/?random"} alt="Lakshya" />
                        <div className=' '>
                            <div className='font-medium text-[20px] cursor-pointer'>
                                {chatState.currentOpenChat.users[0].firstName + " " + chatState.currentOpenChat.users[0].lastName}
                            </div>
                            {isTyping ? <div className='font-medium text-xs text-green-500'>
                                {"typing..."}
                            </div> : null}
                        </div>
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

                    {chatState.messages.map((m) => {
                        return (<Messages key={m._id} own={m.sender._id.toString() === UserState.data._id.toString() ? true : false} m={m} />)
                    })}

                    {/* <View /> */}
                    {/* {isTyping ? <Lottie
                        animationData={animationData}
                        className="w-10 h-10 "
                        />:<div></div>} */}


                    <div ref={bottomRef} />

                    <button id="goToBottomButton" class="fixed bottom-24 right-7 p-2 hover:cursor-pointer  text-white rounded-full" onClick={()=>bottomRef.current?.scrollIntoView({behavior: 'smooth'})}>
                        <svg className="w-6 h-6  r-5 hover:cursor-pointer" onClick={()=>bottomRef.current?.scrollIntoView({behavior: 'smooth'})}>

                            <svg class="w-6 h-6 text-violet-500 hover:cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" viewBox="0 0 24 24" stroke="currentColor" onClick={()=>bottomRef.current?.scrollIntoView({behavior: 'smooth'})}>
                                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" className='hover:cursor-pointer'></path>
                            </svg>
                        </svg>
                    </button>

                    <div id='conversationBottom' className='pl-10 md:pl-20 pr-[140px] md:pr-[480px] fixed bottom-10 md:bottom-2 right-0 left-[75px]  md:left-[430px] w-full border-gray-300 pt-8 '>

                        {/* <input type="text" className='w-full  border-1 h-10 outline-none bg-white px-3 focus:border-b-2 border-[#444791]' style={{ "borderRadius": "8px" }} placeholder="Type a new message" /> */}
                        <MessageBox typing={typing} setTyping={setTyping} isTyping={isTyping} setIsTyping={setIsTyping} bottomRef={bottomRef} />
                    </div>


                </div>
            </div>
    )
}

export default Conversation