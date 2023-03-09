import { useSelect } from '@mui/base';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GrpContext from '../../../Context/GrpContext/GrpContext';
import { addMemberToGroup, getGrpDetails } from '../../../Redux/Group/groupSlice';
import showToast from '../../../Utils/showToast';

const AddMemberForm = (props) => {
    const {createAGrp} = useContext(GrpContext);

    const { hidden, setHidden, toggleModal } = props;
  
  
    const [data, setData] = useState({ email: ''});
    
    const Dispatch = useDispatch();
  
    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
    
  
    const handleCreate = async ()=>{
      Dispatch(addMemberToGroup(props.id,data.email));
      toggleModal();
      setData({email:''})
    //   window.location.reload()
      
    //   console.log(response);
    //   if(!response.success){
    //     showToast({
    //       msg:response.error.substring(response.error.indexOf(':') + 1),
    //       type:"error",
    //       duration:3000
    //     })
    //   }
    //   else{
    //     toggleModal()
    //     showToast({
    //       msg:"Group created successfully.",
    //       type:"success",
    //       duration:4000
    //     })
    //     setData({ email:'' });
    //   }
    }

    const dispatch = useDispatch();
    const id = useParams().id;

    const GrpState = useSelector((state)=> state.group)

    useEffect(()=>{
        dispatch(getGrpDetails(id));
    },[])
  
  
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
                  {!data.email.includes('@') && data.email.length>0 ? <label className='text-sm font-[1.4rem] mr-[1rem] text-red-800'>Email must include @ .</label> : null}
                </div>
                <input type="text" className="w-full bg-gray-100 p-2 mt-2 mb-1 rounded-xl" name='email' value={data.email} onChange={handleChange} placeholder='Enter the email'/>
              </div>
              <div className="bg-gray-200 px-4 py-3 text-right">
                <button className="bg-[#5b5fc7] mb-3 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={() => toggleModal()}>Cancel
                </button>
                {data.grpName!=='' && data.email.includes('@')?<button className="bg-[#5b5fc7] mb-2 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={() => handleCreate()}>Add
                </button>:null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default AddMemberForm