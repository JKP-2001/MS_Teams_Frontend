import React from 'react'

import { Textarea, Button, IconButton } from "@material-tailwind/react";
import { LinkIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { SendMessage, fetchAllChats } from '../../Redux/SearchUser/searchUserSlice';
import { useEffect } from 'react';
import { ScreenLockLandscapeTwoTone } from '@mui/icons-material';
import { io } from 'socket.io-client';
import { Socket } from '../../SocketClient';



const MessageBox = (props) => {

    const [content, setContent] = useState("");

    const typing = props.typing;
    const setTyping = props.setTyping;
    const isTyping = props.isTyping;
    const setIsTyping = props.setIsTyping;



    const dispatch = useDispatch();

    const searchedUsers = useSelector((state) => state.searchedUsers);

    useEffect(() => {


        // let chatId = localStorage.getItem("currChatId");

        // console.log(chatId);

        Socket.on("typing", (chatId) => {
            if(chatId !== localStorage.getItem("currChatId")) return;
            setIsTyping(true);
        });
        Socket.on("stop typing", (chatId) => {
            if(chatId !== localStorage.getItem("currChatId")) return;
            setIsTyping(false);
        })

    }, []);



    const detectChange = (e) => {
        setContent(e.target.value);
        // props.bottomRef.current?.scrollIntoView({behavior: 'smooth'});

        if(e.target.value.length === 0) {
            Socket?.emit("stop typing", localStorage.getItem("currChatId"));
            setTyping(false);
            return;
        }

        if (!Socket) return;

        if (!typing) {
            setTyping(true);
            Socket?.emit("typing", localStorage.getItem("currChatId"));
        }

        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                Socket?.emit("stop typing", localStorage.getItem("currChatId"));
                setTyping(false);
            }
        }, timerLength);

        
    }




    const handleSend = () => {
        console.log({ current: searchedUsers.currentOpenChat })
        if (searchedUsers.currentOpenChat) {
            dispatch(SendMessage(searchedUsers.currentOpenChat._id, content));
            setContent("");

            
        }

    }

    return (
        <>
            {/* <form onSubmit={handleSend}> */}
            <label for="chat" className="sr-only">Your message</label>
            <div className="flex items-center px-3 py-2 md:rounded-lg bg-gray-200 ">
                {/* <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100   ">
                    <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Upload image</span>
                </button>
                <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 ">
                    <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Add emoji</span>
                </button> */}
                <textarea id="chat" rows={"2"} className="block mx-2 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Type a message..." value={content} onChange={detectChange}></textarea>
                <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 " onClick={() => handleSend()}>
                    <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                    <span className="sr-only">Send message</span>
                </button>
            </div>
            {/* </form> */}
        </>

    )
}

// rows={(Math.floor(content.length/111) + 1).toString()} 



export default MessageBox




