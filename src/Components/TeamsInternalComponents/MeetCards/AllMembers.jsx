import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGrpDetails, getMembers } from '../../../Redux/Group/groupSlice';
import AddMemberForm from './AddMemberForm';
import MemberCard from './MemberCard';

const AllMembers = (props) => {
    const GrpState = useSelector((state) => state.group);

    const [hidden, setHidden] = useState('hidden');

    const toggleModal = () => {
        if (hidden === 'hidden') {
          setHidden('');
        } else {
          setHidden('hidden');
        }
      }
    
    const grpid = props.id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGrpDetails(grpid));
        dispatch(getMembers(grpid));
      }, [GrpState.members.length])


    return (
        <div className='container pl-[100px] pt-[90px] min-[946px]:pt-[130px]  min-[946px]:pl-[400px] mb-2 pr-10 w-screen'>
            <div className="container min-[500px]:flex justify-between">
            <div className='text-4xl ml-2 mb-5 font-semibold'>{GrpState.grpName}</div>
            <button className="bg-[#5b5fc7] mx-2 md:mx-3  hover:bg-blue-700 text-white font-normal py-1 mr-3  border border-blue-700 rounded w-[144.72px] h-[40px]" onClick={()=> toggleModal()}>Add Members</button>
            </div>
            {/* <div className="flex space-x-4 pt-3 pl-2 "> */}
            <div className='text-lg ml-2 font-semibold'>Owner</div>
            {GrpState.owner ?

                (<MemberCard name={GrpState.owner.firstName + ' ' + GrpState.owner.lastName} role={'Owner'} email={GrpState.owner.email} />) : null}

            <hr className='pb-2' />
            <div className='text-lg ml-2 font-semibold'>Admins</div>
            <div className="container">
                <div className="flex flex-wrap">
                    {GrpState.owner ?
                        GrpState.admins.map((mem) => {
                            return (<MemberCard key={mem._id} name={mem.firstName + ' ' + mem.lastName} role={'Admin'} email={mem.email} />)
                        }) : null}
                    <hr className='pb-2' />
                </div>
            </div>
            <hr className='pb-2' />
            <div className='text-lg ml-2 font-semibold'>Members</div>
            <div className="container">
                <div className="flex flex-wrap">
                    {GrpState.owner ?
                        GrpState.members.map((mem) => {
                            return (<MemberCard key={mem._id} name={mem.firstName + ' ' + mem.lastName} role={'Member'} email={mem.email} />)
                        }) : null}
                    <hr className='pb-2' />
                </div>
            </div>
            <AddMemberForm hidden={hidden} setHidden={setHidden} toggleModal={toggleModal} id={grpid}/>
        </div>
        
    )
}

export default AllMembers