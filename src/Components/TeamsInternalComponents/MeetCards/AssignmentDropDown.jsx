import React, { useEffect } from 'react'


import { Fragment, useContext, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import NewPostCard from './NewPostCard'
import EditPostCard from './EditPostCard'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import GrpContext from '../../../Context/GrpContext/GrpContext'
import { useDispatch, useSelector } from 'react-redux'
import { addMemberToGroup, getAssignmentOfAGrp, getGrpItems, getMembers } from '../../../Redux/Group/groupSlice'
import showToast from '../../../Utils/showToast'
import { toast } from 'react-hot-toast'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AssignmentDropDown(props) {
    const authState = useSelector((state) => state.auth);
    const GRPState = useSelector((state) => state.group);

    const { deleteAssignment } = useContext(GrpContext);

    const [isAllowed, setIsAllowed] = useState(false);

    const dispatch = useDispatch();

    const handleAdd = async () => {

        // const result = addAdmin(props.grpid, props.email);

        // toast.promise(result, {
        //     loading: 'Loading ...',
        //     success: (data) => {
        //         if (!data.success) return;
        //         dispatch(getGrpItems(id));
        //         dispatch(getMembers(props.grpid));
        //         return `${props.email} added to admin.`;
        //     },
        //     error: 'Uh oh, there was an error!',
        //     duration: 1000
        // });

    }

    const handleDel = async () => {
        const result = deleteAssignment(props.ass_id);
        console.log(result)

        toast.promise(result, {
            loading: 'Loading ...',

            success: (data) => {
                console.log(data);
                if (!data.success) return `${data.error}`;
                dispatch(getAssignmentOfAGrp(props.grpId));
                return `${data.details}`;
            },

            error: (data)=>{
                if(!data.success){
                    return `${data.details}`
                }
            },
            duration: 1000
        });
    }

    const Navigate = useNavigate();

    // const handleLeaveOrRemove = (email) => {
    //     dispatch(addMemberToGroup(id, email, 'delete'));
    //     if (email === authState.data.email) {
    //         Navigate('/home');
    //     }
    // }

    useEffect(() => {
        if (String(authState.data._id) === String(props.owner) || String(authState.data._id) === String(GRPState.owner._id)) {
            setIsAllowed(true);
        }
    }, [props.owner, props.ass_id])


    return (
        <>
            {props.owner && props.ass_id && isAllowed ? <Menu as="div" className="relative inline-block text-left z-20 ">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5  bg-white pr-1 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 z-20 rounded-md mt-1">
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0  mb-20 mt-0 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
                        <div className="py-1 z-10">
                            <Menu.Item>
                                <div
                                    className="text-gray-500
                                    block px-4 py-2 text-sm hover:cursor-pointer
                                    hover:bg-gray-100"
                                onClick={handleAdd}
                                >
                                    Edit
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div
                                    className="text-red-600
                                        block px-4 py-2 text-sm hover:cursor-pointer hover:bg-gray-100"
                                     onClick={()=>handleDel()}
                                >
                                    Delete
                                </div>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu> : null}
        </>
    )
}

