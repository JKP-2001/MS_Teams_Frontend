import React from 'react'
import { useState } from 'react'

import Avatar from "../Images/profile.jpg"
import { getDummyUser } from '../Redux/authentication/authSlice';

export default function Universal_Navbar() {
    const [focused,setFocused]=useState(false);
    const onFocus=()=>{
        setFocused(true);
    }
    const onBlur=()=>{
        setFocused(false);
    }

  return (
    <div className='fixed top-0 right-[0px] left-0 max-w-screen bg-[#444791] h-[48px] flex justify-between items-center z-50'>
      <div id='un_left' className='hidden  w-1/6 sm:w-1/4 h-full md:flex justify-center items-center'>
        <div className=' text-white font-bold text-lg' >
            Microsoft Teams
        </div>
      </div>
      <div id='un_middle' className='w-3/4 md:w-1/2 h-full flex items-center justify-center mx-5'>
        <form className=' w-full h-full flex justify-center items-center'>
            {!focused&&<input type="text" className='w-full h-[60%] bg-[rgba(255,255,255,.8)] outline-none rounded-md p-2 font-bold ' onFocus={onFocus} onBlur={onBlur} placeholder="&#128269; Search" />}
            {
                focused&&<input type="text" className='w-full h-[60%] bg-[#fff] outline-none rounded-md p-2 font-bold' onFocus={onFocus} onBlur={onBlur} placeholder="Look for message, files and more."/>
            }
        </form>
      </div>
      <div id='un_right ' className=' w-1/4 h-full px-5'>
            <div id='avatar' className='h-full w-full flex justify-end items-center'>
                <img src={Avatar} alt="Avatar" className='h-[45px] w-[45px] rounded-full  cursor-pointer'/>
            </div>
      </div>
    </div>
  )
}
