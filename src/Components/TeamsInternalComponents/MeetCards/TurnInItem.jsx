import React from 'react'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// import grp_icon from "../.././Images/grp_icon.jpg"
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

const dev_url = process.env.REACT_APP_BASE_DEV==="true"?"http://localhost:5000/":"https://ms-teams.onrender.com/";
// const prod_url = "https://ms-teams.onrender.com/"

const TurnInItem = (props) => {
    
    const gotToLink = (link)=>{
        {link && window.open(dev_url+link, '_blank', 'noreferrer')};
        // {link && window.open(dev_url+link, '_blank', 'noreferrer')};
    }
    return (
        <div className="flex bg-white rounded-lg pt-1 hover:cursor-pointer hover:shadow-lg my-2 border-[3px]" onClick={()=>gotToLink(props.link)}>
            {/* <img src={grp_icon} alt="" className='mx-2 mt-[8px] w-6 h-6' /> */}
            {props.type=='pdf'?
            <>
            <PictureAsPdfIcon className='mx-2 mt-[8px]'/>
            <div className="attachementcontainer mr-20 w-[100%] h-auto pt-[8px] text-sm font-semibold mb-3 md:mb-2">{props.body}</div>
            {props.close?<CloseRoundedIcon className='hover:cursor-pointer ml-3 pl-1' onClick={() => props.RemoveIcon(props.i)} />:null}
            </>:props.type=='img'?<>
            <InsertPhotoOutlinedIcon className='mx-2 mt-[8px]'/>
            <div className="attachementcontainer mr-20 w-[100%] h-auto pt-[8px] text-sm font-semibold mb-3 md:mb-2">{props.body}</div>
            {props.close?<CloseRoundedIcon className='hover:cursor-pointer ml-3 pl-1' onClick={() => props.RemoveIcon(props.i)} />:null}
            </>:null}
        </div>

    )
}



export default TurnInItem





