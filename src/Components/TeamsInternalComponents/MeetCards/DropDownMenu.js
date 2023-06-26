import { Fragment, useContext, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import NewPostCard from './NewPostCard'
import EditPostCard from './EditPostCard'
import { useParams } from 'react-router-dom'
import GrpContext from '../../../Context/GrpContext/GrpContext'
import { useDispatch } from 'react-redux'
import { getGrpItems } from '../../../Redux/Group/groupSlice'
import showToast from '../../../Utils/showToast'
import { getPostItemsArray } from '../../../Redux/Post/postSlice'
import { Socket } from '../../../SocketClient'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropDownMenu(props) {
  const { delAPost } = useContext(GrpContext);
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

  const deleteAItem = async () => {
    const result = await delAPost(id, props.id)
    console.log(result)
    if (result.success) {
      showToast({
        msg: "Item deleted successfully.",
        type: "success",
        duration: 3000
      })
    }
    dispatch(getGrpItems(id));

    Socket?.emit("group message detected",({grpId:localStorage.getItem('currGrpId'),msg:"delete"}));
  }

  const handleEdit = () => {
    dispatch(getPostItemsArray(props.index));
    toggleModal();
  }

  return (
    <>
    <EditPostCard hidden={hidden} setHidden={setHidden} toggleModal={toggleModal} content={props.content} id={props.id} index={props.index} />
      <Menu as="div" className="relative inline-block text-left pb-2 z-0">
        <div>
          <Menu.Button className="z-0 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white pr-1 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <ChevronDownIcon className="-mr-1 h-5 z-0 w-5 text-gray-400" />
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
              {props.isEdit ? <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm hover:cursor-pointer'
                    )} onClick={() => handleEdit()}
                  >
                    Edit
                  </div>
                )}
              </Menu.Item> : null}
              {props.isOwner ? <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm text-red-500 hover:cursor-pointer'
                    )} onClick={() => deleteAItem()}
                  >
                    Delete
                  </div>
                )}
              </Menu.Item> : null}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
