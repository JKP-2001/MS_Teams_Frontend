import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGrpDetails, getMembers } from '../../../Redux/Group/groupSlice';
import AddMemberForm from './AddMemberForm';
import MemberCard from './MemberCard';

const AllMembers = (props) => {
    const GrpState = useSelector((state) => state.group);
    const authstate = useSelector((state) => state.auth);

    const [adminEmail,setAdminEmail] = useState([]);

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
    

    useEffect(() => {
        if(GrpState.owner){
            let arr = [];
            GrpState.admins.map((x)=>{
                arr.push(x.email);
            })
            setAdminEmail(arr);
        }
      }, [GrpState.members.length])

      


    return (
        
        <div className='container px-5 min-[746px]:pl-[100px] pt-[90px] min-[946px]:pt-[130px]  min-[946px]:pl-[400px] mb-16 min-[746px]:pr-10 w-screen'>
            <div className="container min-[500px]:flex justify-between">
            <div className='text-4xl ml-2 mb-5 font-semibold'>{GrpState.grpName}</div>
            {GrpState.owner.email === authstate.data.email || adminEmail.includes(authstate.data.email)?<button className="bg-[#5b5fc7] mx-2 md:mx-3  hover:bg-blue-700 text-white font-normal  mr-3  border border-blue-700 rounded w-[144.72px] h-auto my-2" onClick={()=> toggleModal()}>Add Members</button>:null}
            </div>
            {/* <div className="flex space-x-4 pt-3 pl-2 "> */}
            <div className='text-lg ml-2 font-semibold'>Owner</div>
            {GrpState.owner && authstate.data.email ?

                (<MemberCard name={GrpState.owner.firstName + ' ' + GrpState.owner.lastName} role={'Owner'} email={GrpState.owner.email} />) : null}

            <hr className='pb-2' />
            <div className='text-lg ml-2 font-semibold'>Admins</div>
            <div className="container">
                <div className="flex flex-wrap">
                    {GrpState.owner && authstate.data?
                        GrpState.admins.map((mem) => {
                            return (<MemberCard key={mem._id} grpid={props.id} name={mem.firstName + ' ' + mem.lastName} role={'Admin'} email={mem.email} isOwner={GrpState.owner.email === authstate.data.email || adminEmail.includes(authstate.data.email)}/>)
                        }) : null}
                    <hr className='pb-2' />
                </div>
            </div>
            <hr className='pb-2' />
            <div className='text-lg ml-2 font-semibold'>Members</div>
            <div className="container">
                <div className="flex flex-wrap">
                    {GrpState.owner && authstate.data ?
                        GrpState.members.map((mem) => {
                            return (<MemberCard key={mem._id} grpid={props.id} name={mem.firstName + ' ' + mem.lastName} role={'Member'} email={mem.email} isOwner={GrpState.owner.email === authstate.data.email || adminEmail.includes(authstate.data.email)}/>)
                        }) : null}
                    <hr className='pb-2' />
                </div>
            </div>
            <AddMemberForm hidden={hidden} setHidden={setHidden} toggleModal={toggleModal} id={grpid}/>
        </div>
        
    )
}

export default AllMembers