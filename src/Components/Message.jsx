import React from "react";
import "./Message.css";
import Avatar from "../Images/profile.jpg";
import { useSelector } from "react-redux";

function Message({ own, m }) {
  
  let {friend } = useSelector((state) => {
    return state.messages;
  });

  let { user } = useSelector((state) => {
    return state.user;
  });

  return (
    <div
      id={own ? "messageWrapper_own" : "messageWrapper"}
      className=" my-3 flex  min-w-fit w-[100%]"
    >
      {!own && (
        <img
          className="mt-1 w-[40px] h-[40px] rounded-full hidden md:block"
          src={Avatar}
          alt=""
        />
      )}
      <div
        id={own ? "message_own" : "message"}
        className="flex flex-col w-fit max-w-[70%]"
      >
        <div id="messageTop" className="flex w-[100%] justify-between ">
          <div id="messageSender" className=" px-3 text-[15px] font-medium">
            <span>{own?user.firstName+" "+user.lastName:friend.firstName+" "+friend.lastName}</span>
          </div>
          <div
            id="messageTime"
            className="flex justify-end  gap-3 px-3 font-light text-sm "
          >
            <div className="text-[15px]">{m.date}</div>
            <div className="text-[15px]">{m.time}</div>
          </div>
        </div>
        <div id="messageBottom" className="px-3 pb-3 break-all mt-[8px]">
          <div>{m.text}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
