import React from 'react'
import { useState } from 'react'
import Avatar from "../Images/profile.jpg"
import Searchbar from './Searchbar';
import { useContext } from 'react'
import GrpContext from '../Context/GrpContext/GrpContext'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';


export default function Universal_Navbar() {
  const navigate=useNavigate();
  const { user } = useSelector(state => { return state.user });
  const { fetchKeyWordUser, keywordUsers } = useContext(GrpContext);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchKeyWordUser(keyword);
  }, [keyword.length])
  const [focused, setFocused] = useState(false);
  const onFocus = () => {
    setFocused(true);
  }
  const onBlur = () => {
    setFocused(false);
  }

  return (
    <div className='fixed top-0 right-[0px] left-0 max-w-screen bg-[#444791] h-[48px] flex justify-between items-center z-50'>
      <div id='un_left' className='hidden  w-1/6 sm:w-1/4 h-full md:flex justify-center items-center'>
        <div className=' text-white font-bold text-lg'>
          Microsoft Teams
        </div>
      </div>
      <div id='un_middle' className='w-3/4 md:w-1/2 h-full relative flex flex-col items-center justify-center mx-5'>
        <form className=' w-full h-full flex justify-center items-center'>
          {!focused && <input value={keyword} onChange={(e) => { console.log(typeof (keyword)); setKeyword(e.target.value) }} type="text" className='w-full h-[60%] bg-[rgba(255,255,255,.8)] outline-none rounded-md p-2 ' onFocus={onFocus} onBlur={onBlur} placeholder="Search" />}
          {
            focused && <input value={keyword} onChange={(e) => { setKeyword(e.target.value) }} type="text" className='w-full h-[60%] bg-[#fff] outline-none rounded-md p-2' onFocus={onFocus} onBlur={onBlur} placeholder="Look for message, files and more." />
          }
        </form>
        <div className='absolute top-[40px] w-[100%] bg-white rounded-md drop-shadow-md z-100 flex flex-col '>
          {
            keywordUsers.map((m) => {
              console.log({m});
              if (m._id !== user.id) {
                return <Searchbar key={m._id} u={m} setKeyword={setKeyword} />
              }
            })
          }
        </div>
      </div>
      <div id='un_right ' className=' w-1/4 h-full px-5'>
        <div id='avatar' className='h-full w-full flex justify-end items-center'>
          <img src={Avatar} alt="Avatar" className='h-[45px] w-[45px] rounded-full  cursor-pointer' onClick={()=>{localStorage.removeItem("token");navigate("/login")}} />
        </div>
      </div>
    </div>
  )
}
