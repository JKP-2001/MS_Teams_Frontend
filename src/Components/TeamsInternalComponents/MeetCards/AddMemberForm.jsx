import { useSelect } from '@mui/base';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GrpContext from '../../../Context/GrpContext/GrpContext';
import { addMemberToGroup, getGrpDetails, getMembers } from '../../../Redux/Group/groupSlice';
import showToast from '../../../Utils/showToast';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { toast } from 'react-hot-toast';
import { userGroups } from '../../../Redux/authentication/authSlice';
import { Socket } from '../../../SocketClient';

const AddMemberForm = (props) => {
  const { createAGrp, resetGrpCode, addMemberToGroup } = useContext(GrpContext);

  const { hidden, setHidden, toggleModal } = props;


  const [data, setData] = useState({ email: '' });
  const [is, setIs] = useState(false);

  const [loadingCode, setLoadCode] = useState(false);

  const [addload, setAddLoad] = useState(false);

  const Dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleCreate = async () => {
    setAddLoad(true);
    const json = await addMemberToGroup(props.id, data.email, 'add');
    console.log({json})
    setData({ email: '' })
    setAddLoad(false);
    toggleModal();

    dispatch(getMembers(id));
    dispatch(userGroups());

    if (!json.success) {
      showToast({
        msg: json.error.substring(json.error.indexOf(':') + 1),
        type: 'error',
        duration: 3000
      })
    }

    else{
      showToast({
        msg: 'Successfully added to the group.',
        type: 'success',
        duration: 3000
      })

      Socket?.emit("member added", { grpId: props.id, email: data.email });
    }
  }



  const dispatch = useDispatch();
  const id = useParams().id;

  const GrpState = useSelector((state) => state.group)

  const clickGetGrpCode = () => {
    if (is) {
      navigator.clipboard.writeText(GrpState.grpCode);
      toggleModal();
      showToast({
        msg: 'Code copied to clipboard',
        type: 'success',
      })
    }
    setIs(!is);
  }

  const clickResetCode = async () => {
    setLoadCode(true);
    const result = await resetGrpCode(id);
    setLoadCode(false);
    if (result.success) {
      showToast({
        msg: 'Link Reset Successfully',
        type: 'success',
      })

      dispatch(getGrpDetails(id));

      Socket?.emit("code reset", { grpId: id });
    }
  }

  useEffect(() => {
    dispatch(getGrpDetails(id));
  }, [])



  return (
    <>
      <div className={`fixed z-50 tabindex="-1" overflow-y-auto top-0 w-full left-0 ${hidden}`} id="modal" onClick={() => toggleModal(false)}>
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
          <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline" onClick={e => {
            e.stopPropagation();
          }}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className='text-[1.3rem] font-medium mb-3 leading-[1.33333rem]'>
                Request to add members to {GrpState.grpName}
              </div>
              <p className='mb-4 text-xs'>
                Type a email, to add the member.
              </p>
              <div className='flex justify-between'>
                <label className='text-sm font-[1.4rem]'>Email</label>
                {!data.email.includes('@') && data.email.length > 0 ? <label className='text-sm font-[1.4rem] mr-[1rem] text-red-800'>Email must include @ .</label> : null}
              </div>
              <input type="text" className="w-full bg-gray-100 p-2 mt-2 mb-1 rounded-xl" name='email' value={data.email} onChange={handleChange} placeholder='Enter the email' />
              <div className='text-center my-2'>OR</div>
              <div className="text-center">
                {!is ? <button className="bg-[#5b5fc7] mb-3 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={clickGetGrpCode}>Get Team Code
                </button> : !loadingCode ? <button className="bg-[#5b5fc7] mb-3 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={clickGetGrpCode}>{GrpState.grpCode}
                </button> :
                  <button disabled type="button" class="w-[144.72px] h-[32px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mb-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center justify-center">
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                    <div className='text-center'>Loading...</div>
                  </button>}</div>
              {is ?
                <div className="flex justify-center items-center ">
                  <div className="hover:cursor-pointer mr-1" onClick={clickGetGrpCode}><ContentCopyOutlinedIcon fontSize='small' /> Copy</div>
                  <div className="hover:cursor-pointer ml-3" onClick={clickResetCode}><RestartAltOutlinedIcon fontSize='small' /> Reset</div>
                </div> : null}

            </div>
            <div className="bg-gray-200 px-4 py-3 text-right">
              <button className="bg-[#5b5fc7] mb-3 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={() => toggleModal()}>Cancel
              </button>
              {data.grpName !== '' && data.email.includes('@') ? 
              !addload?<button className="bg-[#5b5fc7] mb-2 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={()=>handleCreate()}>Add
              </button>:
              <button disabled type="button" class="bg-[#5b5fc7] mb-2 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px] inline-flex items-center justify-center">
              <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
              <div className='text-center'>Loading...</div>
            </button>
             : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMemberForm