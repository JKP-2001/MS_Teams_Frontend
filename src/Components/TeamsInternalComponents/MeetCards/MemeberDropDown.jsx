import { Fragment, useContext, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import NewPostCard from './NewPostCard'
import EditPostCard from './EditPostCard'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import GrpContext from '../../../Context/GrpContext/GrpContext'
import { useDispatch, useSelector } from 'react-redux'
import { addMemberToGroup, getGrpItems, getMembers } from '../../../Redux/Group/groupSlice'
import showToast from '../../../Utils/showToast'
import { toast } from 'react-hot-toast'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MemberDropDown(props) {
  const authState = useSelector((state) => state.auth);
  const { delAPost, addAdmin, removeAdmin } = useContext(GrpContext);
  const [hidden, setHidden] = useState('hidden');
  const toggleModal = () => {
    if (hidden === 'hidden') {
      setHidden('');
    } else {
      setHidden('hidden');
    }
  }

  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();

  const handleAdd = async () => {

    const result = addAdmin(props.grpid, props.email);

    toast.promise(result, {
      loading: 'Loading ...',
      success: (data) => {
        if (!data.success) return;
        dispatch(getGrpItems(id));
        dispatch(getMembers(props.grpid));
        return `${props.email} added to admin.`;
      },
      error: 'Uh oh, there was an error!',
      duration:1000
    });

  }

  const handleDel = async () => {
    const result = removeAdmin(props.grpid, props.email);
    
    
    toast.promise(result, {
      loading: 'Loading ...',

      success: (data) => {
        if (!data.success) return;
        dispatch(getGrpItems(id));
        dispatch(getMembers(props.grpid));
        return `${props.email} removed from admin.`;
      },
      error: 'Uh oh, there was an error!',
      duration:1000
    });

    // if (result.success) {
    //   showToast({
    //     msg: `${props.email} removed from admin.`,
    //     type: "success",
    //     duration: 3000
    //   })
    // }
  }

  const Navigate = useNavigate();

  const handleLeaveOrRemove = (email) => {
    dispatch(addMemberToGroup(id, email, 'delete'));
    if (email === authState.data.email) {
      Navigate('/home');
    }
  }


  return (
    <>
      {props.isOwner ? <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5  bg-white pr-1 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 z-20 rounded-md">
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
          <Menu.Items className="absolute right-0  mb-20 mt-0 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
            <div className="py-1 z-10">
              {props.role && props.role == 'Member' ? <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm hover:cursor-pointer'
                    )} onClick={handleAdd}
                  >
                    Make Admin
                  </div>
                )}
              </Menu.Item> : null}
              {props.email !== authState.data.email ?
                props.role && props.role == 'Admin' && props.isOwner ? <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm hover:cursor-pointer text-red-600'
                      )} onClick={handleDel}
                    >
                      Dismiss As Admin
                    </div>
                  )}
                </Menu.Item> : null : null}

              {props.role && (props.role == 'Member' || props.role == 'Admin') ?
                props.email !== authState.data.email ?
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm hover:cursor-pointer z-20 text-red-600'
                        )} onClick={() => handleLeaveOrRemove(props.email)}
                      >
                        Remove
                      </div>
                    )}
                  </Menu.Item> :
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm hover:cursor-pointer z-20 text-red-600'
                        )} onClick={handleLeaveOrRemove}
                      >
                        Leave
                      </div>
                    )}
                  </Menu.Item>
                : null}
            </div>
          </Menu.Items>
        </Transition>
      </Menu> :
        props.email === authState.data.email ?
          <Menu as="div" className="relative inline-block text-left pb-2 z-30">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5  bg-white pr-1 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
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
              <Menu.Items className="absolute right-0  mt-0 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                <div className="py-1">

                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm hover:cursor-pointer text-red-600 z-20'
                        )} onClick={() => handleLeaveOrRemove(authState.data.email)}
                      >
                        Leave
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu> : null}
    </>
  )
}
