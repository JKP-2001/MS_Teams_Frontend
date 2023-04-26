import React from 'react'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const Item = (props) => {
    
    const gotToLink = (link)=>{
        {link && window.open('http://localhost:5000/'+link, '_blank', 'noreferrer')};
    }
    return (
        <div className="item flex mr-4 hover:cursor-pointer hover:bg-[#f5f5f5]" onClick={()=>gotToLink(props.link)}>
            {props.type=='pdf'?<div className="text max-h-0 pt-[8px]  px-3 rounded-t-md  mr-2"><PictureAsPdfIcon /></div>:props.type=='img'?<div className="text m-h-10 pt-[8px]  px-3 rounded-t-md  mr-2"><InsertPhotoOutlinedIcon /></div>:<div className="text m-h-10 pt-[8px]  px-3 rounded-t-md  mr-2"><InsertDriveFileOutlinedIcon /></div>}
            <div className="item_name py-2 overflow-hidden">{props.body}</div>
        </div>

    )
}

export default Item