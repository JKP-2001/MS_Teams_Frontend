import React from 'react'
import grp_icon from "../.././Images/grp_icon.jpg"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';



const AssignmentMaterial = (props) => {

    const url = process.env.REACT_APP_FILE_URL;


    const gotToLink = (link)=>{
        {link && window.open(url+link, '_blank', 'noreferrer')};
    }
    return (
        <div className="flex bg-white rounded-lg pt-1 hover:cursor-pointer hover:shadow-lg my-2 border-[3px]" onClick={()=>gotToLink(props.link)}>
            {/* <img src={grp_icon} alt="" className='mx-2 mt-[8px] w-6 h-6' /> */}
            {props.type=='pdf'?
            <>
            <PictureAsPdfIcon className='mx-2 mt-[8px]'/>
            <div className="attachementcontainer mr-20 w-[100%] h-auto pt-[8px] text-sm font-semibold mb-3 md:mb-2">{props.body}</div></>:props.type=='img'?<>
            <InsertPhotoOutlinedIcon className='mx-2 mt-[8px]'/>
            <div className="attachementcontainer mr-20 w-[100%] h-auto pt-[8px] text-sm font-semibold mb-3 md:mb-2">{props.body}</div></>:null}
        </div>
    )
}

export default AssignmentMaterial