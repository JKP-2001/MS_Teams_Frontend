import React from 'react'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const dev_url = "http://localhost:5000/"
const prod_url = "https://ms-teams.onrender.com/"

const Item = (props) => {
    
    const gotToLink = (link)=>{
        {link && window.open(prod_url+link, '_blank', 'noreferrer')};
        // {link && window.open(dev_url+link, '_blank', 'noreferrer')};
    }
    return (
        <div className="item flex mr-4 hover:cursor-pointer hover:bg-[#f5f5f5]" onClick={()=>gotToLink(props.link)}>
            {props.type=='pdf'?<div className="text max-h-0 pt-[8px]  px-3 rounded-t-md  mr-2"><PictureAsPdfIcon /></div>:props.type=='img'?<div className="text m-h-10 pt-[8px]  px-3 rounded-t-md  mr-2"><InsertPhotoOutlinedIcon /></div>:<div className="text m-h-10 pt-[8px]  px-3 rounded-t-md  mr-2"><InsertDriveFileOutlinedIcon /></div>}
            <div className="item_name pt-1 overflow-hidden">{props.body.slice(0,6)+"...."}</div>
        </div>

    )
}

export default Item