import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGrpDetails, getMembers } from '../../../Redux/Group/groupSlice';
import AddMemberForm from './AddMemberForm';
import MemberCard from './MemberCard';

const AllMembers = (props) => {
    const GrpState = useSelector((state) => state.group);
    const authstate = useSelector((state) => state.auth);

    const [adminEmail, setAdminEmail] = useState([]);

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
        if (GrpState.owner) {
            let arr = [];
            GrpState.admins.map((x) => {
                arr.push(x.email);
            })
            setAdminEmail(arr);
        }
    }, [GrpState.members.length])



    if (GrpState.owner && GrpState.admins && GrpState.members) {
        return (

            <div className='container px-5 min-[746px]:pl-[100px] pt-[90px] min-[946px]:pt-[130px]  min-[946px]:pl-[400px] min-[746px]:pr-10 w-screen'>
                <div className="container min-[500px]:flex justify-between">
                    <div className='text-4xl ml-2 mb-5 font-semibold'>{GrpState.grpName}</div>
                    {GrpState.owner.email === authstate.data.email || adminEmail.includes(authstate.data.email) ? <button className="bg-[#5b5fc7] mx-2 md:mx-3  hover:bg-blue-700 text-white font-normal  mr-3  border border-blue-700 rounded w-[144.72px] h-auto my-2" onClick={() => toggleModal()}>Add Members</button> : null}
                </div>
                {/* <div className="flex space-x-4 pt-3 pl-2 "> */}
                <div className='text-lg ml-2 font-semibold'>Owner</div>
                {GrpState.owner && authstate.data.email ?

                    (<MemberCard name={GrpState.owner.firstName + ' ' + GrpState.owner.lastName} role={'Owner'} email={GrpState.owner.email} />) : null}

                <hr className='pb-2' />
                <div className='text-lg ml-2 font-semibold'>Admins</div>
                <div className="container">
                    <div className="flex flex-wrap">
                        {GrpState.owner && authstate.data ?
                            GrpState.admins.map((mem) => {
                                return (<MemberCard key={mem._id} grpid={props.id} name={mem.firstName + ' ' + mem.lastName} role={'Admin'} email={mem.email} isOwner={GrpState.owner.email === authstate.data.email || adminEmail.includes(authstate.data.email)} />)
                            }) : null}
                        <hr className='pb-2' />
                    </div>
                </div>
                <hr className='pb-2' />
                <div className='text-lg ml-2 font-semibold'>Members</div>
                <div className="container mb-28">
                    <div className="flex flex-wrap">
                        {GrpState.owner && authstate.data ?
                            GrpState.members.map((mem) => {
                                return (<MemberCard key={mem._id} grpid={props.id} name={mem.firstName + ' ' + mem.lastName} role={'Member'} email={mem.email} isOwner={GrpState.owner.email === authstate.data.email || adminEmail.includes(authstate.data.email)} />)
                            }) : null}
                        <hr className='pb-2' />
                    </div>
                </div>
                <AddMemberForm hidden={hidden} setHidden={setHidden} toggleModal={toggleModal} id={grpid} />
            </div>

        )
    }
    else{
        return(<div className='container px-5 min-[746px]:pl-[100px] pt-[90px] min-[946px]:pt-[130px]  min-[946px]:pl-[400px] min-[746px]:pr-10 w-screen'>
            <button disabled type="button" class=" w-full  text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center justify-center">
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                <div className='text-center text-black text-2xl'>Loading...</div>
              </button>
        </div>)
    }
}

export default AllMembers