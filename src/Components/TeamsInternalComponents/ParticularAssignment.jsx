import React from 'react'
import NavbarCoponent from '../NavbarComponet/NavbarCoponent'
import SideBarComponent from '../SideBarComponent/SideBarComponent'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';


import AssignmentMaterial from './AssignmentMaterial';

const ParticularAssignment = () => {
    return (
        <div>
            <NavbarCoponent />
            <div>
                <SideBarComponent />
            </div>
            <div className="flex ml-[30px] md:ml-[50px] mt-[48px] bg-[#f5f5f5] justify-between">
                {/* <div ><SecondNav/></div> */}
                    
                        <div className="back pt-8 pl-14">
                        <span className='text-[#6064c9] font-semibold text-base font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif]'><Link to="/assignment" ><ChevronLeftIcon fontSize='large'/> <span>Back</span></Link></span>
                        </div>

                        <div className="back pt-[26px] md:pt-[22px] pl-4 order-last justify-end pr-32">
                        <button type="button" className="text-white bg-[#5b5fc7] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 pb:12 dark:bg-[#5b5fc7] dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Turn In</button>
                        </div>
            </div>

            <div className="ml-[30px] md:ml-[50px] bg-[#f5f5f5]  justify-center items-center ">
                {/* <div ><SecondNav/></div> */}
                <div className=" px-12 justify-center items-center ">
                    <div className="flex space-x-8">
                        <div className="back pt-10 pl-4">
                            <div className='text-black font-semibold font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] text-2xl pb-3 md:pb-0 md:text-3xl' ><span>1st Assignment on Casting and Joining Processing</span></div>
                            <div className='text-[#737373] font-base font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] ' ><span>Due 30 August 2021 23:59</span></div>
                            <div className='pt-4' ><span></span></div>
                            <div className='text-[#737373] font-semibold font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] ' ><span>Instructions</span></div>    
                            <div className='text-[#737373] font-base font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] ' ><span className='text-inherit'>None</span></div>    
                            <div className='pt-2' ><span></span></div>
                            <div className='my-2 font-semibold font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] text-[#737373]' ><span className='text-inherit'>Reference materials</span></div>    
                            <AssignmentMaterial />
                            <AssignmentMaterial />
                            <div className='pt-2' ><span></span></div>
                            <div className='my-2 font-semibold font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif] text-[#737373]' ><span className='text-inherit'>My Work</span></div>    
                            <AssignmentMaterial />
                            <AssignmentMaterial />
                            <AssignmentMaterial />
                            <AssignmentMaterial />
                            <AssignmentMaterial />
                            <AssignmentMaterial />
                            <div className="flex pt-2 pb-10">
                                <div className="attach hover:cursor-pointer">
                                    <AttachFileIcon fontSize='small'/> <span className='text-[#5b5fc7] font-semibold text-sm'>Attach</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default ParticularAssignment