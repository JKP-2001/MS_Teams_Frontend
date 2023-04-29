import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import user from "../../Images/user.png"
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function NavbarCoponent() {
  return (
    <>
      <div className=" navbar flex justify-between items-center pl-6 md:pl-20  fixed top-0 left-0 right-0 z-50 bg-[#444791] h-12">
        <div className="logo text-center h-1.5 flex justify-between items-center ">
          <Link to="/"><div className='w-full font-medium text-xs md:text-sm text-white pl-2'>Microsoft Teams</div></Link>
          {/* <div className="teamsname md:visible md:pl-8 text">Teams</div> */}
        </div>


        <div className="input-group relative items-stretch w-6/12 mb-4 pt-4 ">
          <input type="search" className="form-control relative min-w-0 block w-full h-1/6 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2 " />
        </div>

        <div className="image flex">
          <Link to="/profile"><PersonOutlineOutlinedIcon /></Link>

          <Link to="/logout" className='hover:cursor-pointer'><LogoutOutlinedIcon className='mx-10'/></Link>
        </div>
      </div>
    </>
  )
}
