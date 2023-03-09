import { Description } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import GrpContext from '../../Context/GrpContext/GrpContext';
import showToast from '../../Utils/showToast';

export function JoinTeamForm(props) {

  const {createAGrp} = useContext(GrpContext);

  const { hidden, setHidden, toggleModal } = props;

  const [isPrivate, setPrivate] = useState(false);

  const [data, setData] = useState({ grpName: '', desc: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const checkClick = () => {
    setPrivate(!isPrivate);
  }

  const handleCreate = async ()=>{
    const response = await createAGrp(data.grpName, data.desc, isPrivate);
    console.log(response);
    if(!response.success){
      showToast({
        msg:response.error.substring(response.error.indexOf(':') + 1),
        type:"error",
        duration:3000
      })
    }
    else{
      toggleModal()
      showToast({
        msg:"Group created successfully.",
        type:"success",
        duration:4000
      })
      setData({ grpName: '', desc: '' });
      setPrivate(false);
    }
  }


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
                Create your team
              </div>
              <p className='mb-4 text-xs'>
                Collaborate closely with a group of people inside your organisation based on project, initiative, or common interest.
              </p>
              <div className='flex justify-between'>
                <label className='text-sm font-[1.4rem]'>Team Name</label>
                {data.grpName.length > 200 ? <label className='text-sm font-[1.4rem] mr-[1rem] text-red-800'>Character limit reached</label> : null}
              </div>
              <input type="text" className="w-full bg-gray-100 p-2 mt-2 mb-1 rounded-xl" name='grpName' value={data.grpName} onChange={handleChange} />
              <p className='mb-2 font-semibold break-words'>Grp_{data.grpName}</p>
              <div className='flex justify-between'>
                <label className='text-sm font-[1.4rem]'>Description</label>
                {data.desc.length > 200 ? <label className='text-sm font-[1.4rem] mr-[1rem] text-red-800'>Character limit reached</label> : null}
              </div>
              <textarea type="text" className="w-full bg-gray-100 p-2 mt-2 mb-3 rounded-xl" name='desc' value={data.desc} onChange={handleChange} placeholder='Let people know what this team is all about' />
              <label className='text-sm font-[1.4rem] mr-1'>Private</label>
              <input type="checkbox" id="myCheck" onClick={() => checkClick()}></input>
            </div>
            <div className="bg-gray-200 px-4 py-3 text-right">
              <button className="bg-[#5b5fc7] mb-3 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={() => toggleModal()}>Cancel
              </button>
              {data.grpName!==''?<button className="bg-[#5b5fc7] mb-2 mx-2 md:mx-3  hover:bg-blue-700 text-white font-semibold py-1  border border-blue-700 rounded w-[144.72px] h-[32px]" onClick={() => handleCreate()}>Create
              </button>:null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}




