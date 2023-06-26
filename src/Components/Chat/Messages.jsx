import React from 'react'
import "./Messages.css";
import { useState } from 'react';

const Messages = (props) => {

    const user = {firstName:"Jitendra", lastName:"Pandey"}
    const friend = {firstName:"Bittu", lastName:"Kumar"}

    const options = { day: '2-digit', month: 'numeric', year: 'numeric' };

    const [date,setDate] = useState(new Date(props.m.createdAt).toLocaleDateString('en-GB', options))

    const [time,setTime] = useState(new Date(props.m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))


    
  return (
    <div
      id={props.own ? "messageWrapper_own" : "messageWrapper"}
      className=" my-3 flex  min-w-fit w-[100%] rounded-lg"
    >
      {!props.own && (
        <img
          className="mt-1 w-[40px] h-[40px] rounded-full hidden md:block"
          src={"https://picsum.photos/32/32/?random"}
          alt=""
        />
      )}
      <div
        id={props.own ? "message_own" : "message"}
        className="flex flex-col w-fit max-w-[70%]"
      >
        <div id="messageTop" className="flex w-[100%] justify-between ">
          <div id="messageSender" className=" px-3 text-[15px] font-medium">
            {/* <span className={props.own?"text-white mt-2":"text-slate-900 mt-1"}>{props.own?user.firstName+" "+user.lastName:friend.firstName+" "+friend.lastName}</span> */}
          </div>
          <div
            id="messageTime"
            className="flex justify-end  gap-3 px-3 font-light text-sm "
          >
            <div className={props.own?"text-white":"text-slate-900"+" text-[15px]"}>{date}</div>
            <div className={props.own?"text-white":"text-slate-900"+" text-[15px]"}>{time}</div>
          </div>
        </div>
        <div id="messageBottom" className="px-3 pb-3 break-all mt-[8px]">
          <div className={props.own?"text-white":"text-slate-900"}>{props.m.content}</div>
        </div>
      </div>
    </div>
  )
}

export default Messages