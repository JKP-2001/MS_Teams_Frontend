import React, { useContext, useState } from 'react'
import NavbarCoponent from '../NavbarComponet/NavbarCoponent'
import SecondNav from '../NavbarComponet/SecondNav'
import SideBarComponent from '../SideBarComponent/SideBarComponent'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import create_icon from "../.././Images/create_icon.svg"
import join_code from "../.././Images/join_code.svg"
import team_mem1 from "../.././Images/team_mem1.svg"
import team_mem2 from "../.././Images/team_mem2.svg"
import team_mem3 from "../.././Images/team_mem3.svg"
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import GrpContext from '../../Context/GrpContext/GrpContext';
import showToast from '../../Utils/showToast';
import { JoinTeamForm } from '../TeamsInternalComponents/JoinTeamForm';

const JoinOrCreate = () => {
    const [joinCode, setJoinCode] = useState('');

    const detectChange = (e) => {
        setJoinCode(e.target.value);
    }

    const [hidden, setHidden] = useState('hidden');
    const [joinloading, setJoinLoading] = useState(false);
    const [crloading, setCrLoading] = useState(false);

    const toggleModal = () => {
        if (hidden === 'hidden') {
            setHidden('');
        } else {
            setHidden('hidden');
        }
    }

    const { joinTeamByCode } = useContext(GrpContext);

    const joinATeam = async () => {
        if (joinCode.length < 10) {
            showToast({
                msg: "Invalid Code",
                type: "error",
                duration: 3000
            })
        }
        else {

            setJoinLoading(true);
            const result = await joinTeamByCode(joinCode);
            setJoinLoading(false);

            if (!result.success) {
                showToast({
                    msg: result.error.substring(result.error.indexOf(':') + 1),
                    type: "error",
                    duration: 3000
                })
            }
            else {
                showToast({
                    msg: result.details,
                    type: "success",
                    duration: 3000
                })
            }
        }
    }

    return (
        <div>
            <NavbarCoponent />
            <div className="flex">
                <div>
                    <SideBarComponent />
                </div>
                <div className="min-[746px]:ml-[80px] sm:ml-[100px] mt-[70px] grid-cols-1 mb-2">
                    <span className='text-[#6064c9] font-semibold text-base font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif]'><Link to="/" ><ChevronLeftIcon fontSize='large' className="mb-[2px]" /> <span>Back</span></Link></span>
                </div>
            </div>
            <div className="container px-6 min-[746px]:ml-[100px] w-auto pb-20">
                <div className="name text-2xl">
                    Join or create a team
                </div>

                <div className="flex md:space-x-4 flex-wrap content-center ml-10">
                    <div className="createteambox border-2 mt-4 bg-white  max-[384px]:w-11/12 w-auto h-[260px] rounded-[0.4rem] hover:bg-[#f5f5f5] hover:border-[#f5f5f5]">
                        <div className=" icon ml-[99px] mt-5">
                            <img className='w-[80px] h-[64px] rounded-md' src={create_icon} alt="" />
                        </div>
                        <div className="title ml-[75px] pt-2 font-semibold text-lg">
                            Create a Team
                        </div>
                        <div className="flex threememicon space-x-2 ml-[75px] pt-4">
                            <div className="icon1">
                                <img className=' rounded-full w-[32px] h-[32px] ' src={team_mem1} alt="" />
                            </div>
                            <div className="icon2">
                                <img className=' rounded-full w-[32px] h-[32px]' src={team_mem2} alt="" />
                            </div>
                            <div className="icon3">
                                <img className=' rounded-full w-[32px] h-[32px]' src={team_mem3} alt="" />
                            </div>

                        </div>
                        <div className="createbutton py-6 mx-14 text-sm">
                            {!crloading ? <button className="bg-[#5b5fc7] hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={() => {


                                setCrLoading(true)
                                toggleModal()
                                setCrLoading(false)
                            }
                            }>
                                <GroupAddOutlinedIcon fontSize='medium' className='pb-1 pr-2' /> Create team
                            </button> :
                                <button disabled type="button" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center justify-center">
                                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    <div className='text-center'>Loading...</div>
                                </button>}
                        </div>
                    </div>


                    <div className="createteambox border-2 mt-4 bg-white max-[384px]:w-11/12 w-auto h-[260px] rounded-[0.4rem]">
                        <div className=" icon ml-[99px] mt-5">
                            <img className='w-[64px] h-[64px] rounded-md' src={join_code} alt="" />
                        </div>
                        <div className="title ml-[75px] pt-2 font-semibold text-lg">
                            Join a Team
                        </div>
                        <div className="flex threememicon space-x-2 ml-[40px] pt-4">
                            <input maxLength={10} placeholder="Enter Code" className='border-0 w-[180px] rounded-lg pr-[20px] bg-[#f5f5f5] h-[34px] border-white text-center' name='joinCode' value={joinCode} onChange={detectChange}></input>

                        </div>
                        {!joinloading ? <div className="createbutton py-6 mx-14 text-sm">
                            <button className="bg-[#5b5fc7] hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={joinATeam}>
                                <GroupAddOutlinedIcon fontSize='medium' className='pb-1 pr-2' /> Join A Team
                            </button>
                        </div> :
                        <div className="createbutton py-6 mx-14 text-sm">
                            <button disabled type="button" className="w-full text-white bg-[#5b5fc7] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center justify-center">
                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                <div className='text-center'>Loading...</div>
                            </button>
                            </div>}
                    </div>
                </div>
                <JoinTeamForm hidden={hidden} setHidden={setHidden} toggleModal={toggleModal} />
            </div>
        </div>
    )
}

export default JoinOrCreate