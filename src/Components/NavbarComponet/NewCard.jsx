import React from 'react'
import { Link, useParams } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import cardImage from "../../Images/image2.jpeg";
import GS from "../../Images/GS.jpg"

const NewCard = (props) => {
  // const params = useParams();
  const grp_id = props.grp_id;
  return (
    
    <Link to={`/grp/${grp_id}`}><div className="border-2 bg-white mx-2 pb-7 mb-3 justify-center items-center hover:bg-[#f5f5f5] hover:border-[0.1px] hover:border-slate-300 rounded-md">
            <div className="text-right"><MoreHorizIcon/></div>
            <div className='scale-75 justify-center items-center flex mb-4'><img className='rounded-md' src={GS} alt="Grp displayPicture"/></div>
            <div className='text-center mb-6 mx-auto'>{props.grpName}</div>
            
        </div>
        </Link>
    
  )
}

export default NewCard