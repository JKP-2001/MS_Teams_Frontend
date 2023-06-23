import React from 'react'

const SideBarFriend = (props) => {
  return (
    <>
    <div className='flex pl-3 mt-1 cursor-pointer hover:bg-white pt-2 py-4 mx-2 mr-1 hover:rounded-lg'>
      <div id='profileImg'>
        <img src={"https://picsum.photos/32/32/?random"} className="w-10 h-10 rounded-full mt-[0.8px]" alt="" />
      </div>
      <div id='profileName' className=' items-center pl-2'>
        <div className="name text-base font-mono">{props.firstName+" "+props.lastName}</div>
        <div className="lastMessage text-xs">{props.lastMessangerName?props.lastMessangerName:null} {props.lastMessage?": "+props.lastMessage:null}</div>
      </div>
      <div className="time relative flex-grow mt-2">
        <div className="text-xs absolute right-3">{"12:00"}</div>
      </div>
    </div>
    
    </>
  )
}

export default SideBarFriend