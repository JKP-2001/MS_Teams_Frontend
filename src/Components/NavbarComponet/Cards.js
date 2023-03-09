import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import cardImage from "../.././Images/image2.jpeg";
import { Link } from 'react-router-dom';
import GS from "../.././Images/GS.jpg"

export default function Cards() {
  return (
    <div className="card mx-10 md:mx-2 mb-5 pt-2 grid grid-cols-1 m-3">
        <div className="border-2 bg-white rounded-md">
            <Link to="/grp"><div class="text-right"><img src={GS}/></div>
            <div class='scale-50 text-center m-auto'><img src={cardImage} alt="Grp displayPicture"/></div>
            <div class='text-center mb-6 mx-auto'>Grp_WHATEVER</div>
            </Link>
        </div>
    </div>
  )
}
