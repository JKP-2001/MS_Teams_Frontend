import React from 'react'
import grp_icon from "../.././Images/grp_icon.jpg"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const AssignmentMaterial = () => {
    return (
        <div className="flex bg-white rounded-lg pt-1 hover:cursor-pointer hover:shadow-lg my-2 border-[3px]">
            {/* <img src={grp_icon} alt="" className='mx-2 mt-[8px] w-6 h-6' /> */}
            <PictureAsPdfIcon className='mx-2 mt-[8px]'/>
            <div className="attachementcontainer mr-20 w-auto h-auto pt-[8px] text-sm font-semibold mb-3 md:mb-2">1st Assignment on Casting and Joining Processing.pdf</div>
        </div>
    )
}

export default AssignmentMaterial