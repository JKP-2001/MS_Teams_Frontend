import { Fragment, useContext, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import NewPostCard from './NewPostCard'
import EditPostCard from './EditPostCard'
import { useParams } from 'react-router-dom'
import GrpContext from '../../../Context/GrpContext/GrpContext'
import { useDispatch } from 'react-redux'
import { getGrpItems, getMembers } from '../../../Redux/Group/groupSlice'
import showToast from '../../../Utils/showToast'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MemberDropDown(props) {
    const {delAPost, addAdmin, removeAdmin} = useContext(GrpContext);
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

      const handleAdd = async ()=>{
        
        const result = await addAdmin(props.grpid,props.email)
        dispatch(getGrpItems(id));
        dispatch(getMembers(props.grpid));
        if(result.success){
          showToast({
            msg:`${props.email} added to admin.`,
            type:"success",
            duration:3000
          })
        }
      }

      const handleDel = async ()=>{
        
        const result = await removeAdmin(props.grpid,props.email)

        dispatch(getGrpItems(id));
        dispatch(getMembers(props.grpid));
        if(result.success){
          showToast({
            msg:`${props.email} removed from admin.`,
            type:"success",
            duration:3000
          })
        }
      }


  return (
    <>
    {props.isOwner?<Menu as="div" className="relative inline-block text-left pb-2">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white pr-1 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
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
        <Menu.Items className="absolute right-0  mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {props.role && props.role=='Member'?<Menu.Item>
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
            </Menu.Item>:null}
            {props.role && props.role=='Admin' && props.isOwner?<Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm hover:cursor-pointer text-red-600'
                  )} onClick={handleDel}
                >
                  Remove Admin
                </div>
              )}
            </Menu.Item>:null}
            {/* <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm text-red-500'
                  )} onClick={()=> deleteAItem()}
                >
                  Delete
                </div>
              )}
            </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>:null}
    </>
  )
}
