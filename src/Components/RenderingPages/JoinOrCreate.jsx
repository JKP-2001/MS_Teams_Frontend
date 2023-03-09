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
import {JoinTeamForm} from '../TeamsInternalComponents/JoinTeamForm';

const JoinOrCreate = () => {
    const [joinCode, setJoinCode] = useState('');

    const detectChange = (e)=>{
        setJoinCode(e.target.value);
    }

    const [hidden, setHidden] = useState('hidden');

    const toggleModal = () => {
        if (hidden === 'hidden') {
          setHidden('');
        } else {
          setHidden('hidden');
        }
      }

    const {joinTeamByCode} = useContext(GrpContext);

    const joinATeam = async ()=>{
        if(joinCode.length <10){
            showToast({
                msg:"Invalid Code",
                type:"error",
                duration:3000
            })
        }
        else{
            const result = await joinTeamByCode(joinCode);
        console.log({result})
            if(!result.success){
                showToast({
                    msg:result.error.substring(result.error.indexOf(':') + 1),
                    type:"error",
                    duration:3000
                })
            }
            else{
                showToast({
                    msg:result.details,
                    type:"success",
                    duration:3000
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
                <div className="ml-[80px] sm:ml-[100px] mt-[70px] grid-cols-1 mb-2">
                    <span className='text-[#6064c9] font-semibold text-base font-["Segoe UI Web", "Segoe UI", "Segoe WP", "Segoe UI Emoji", Tahoma, Arial, sans-serif]'><Link to="/" ><ChevronLeftIcon fontSize='large' className="mb-[2px]" /> <span>Back</span></Link></span>
                </div>
            </div>
            <div className="container ml-[100px] w-auto">
                <div className="name  text-2xl">
                    Join or create a team
                </div>

                <div className="flex md:space-x-4 flex-wrap">
                    <div className="createteambox border-2 mt-4 bg-white  max-[384px]:w-10/12 w-auto h-[260px] rounded-[0.4rem] hover:bg-[#f5f5f5] hover:border-[#f5f5f5]">
                        <div className=" icon ml-[99px] mt-5">
                            <img className='w-[64px] h-[64px] rounded-md' src={create_icon} alt="" />
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
                            <button className="bg-[#5b5fc7] hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={()=> toggleModal()}>
                                <GroupAddOutlinedIcon fontSize='medium' className='pb-1 pr-2' /> Create team
                            </button>
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
                        <div className="createbutton py-6 mx-14 text-sm">
                            <button className="bg-[#5b5fc7] hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={joinATeam}>
                                <GroupAddOutlinedIcon fontSize='medium' className='pb-1 pr-2' /> Join A Team
                            </button>
                        </div>
                    </div>
                </div>
                <JoinTeamForm hidden={hidden} setHidden={setHidden} toggleModal={toggleModal}/>
            </div>
        </div>
    )
}

export default JoinOrCreate