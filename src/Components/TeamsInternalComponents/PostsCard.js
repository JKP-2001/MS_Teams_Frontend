import React from 'react'
// import VideocamIcon from '@material-ui/icons/Videocam';
import DuoIcon from '@mui/icons-material/Duo';
import ReplyIcon from '@mui/icons-material/Reply';

export default function PostsCard() {
  return (
    <div className='border-solid border-gray my-5 flex'>
        <div className='flex initial w-[64px]'><DuoIcon/></div>
        <div className='grid grid-cols-1'>
            <div>New channel meeting ended: 23m27s</div>
            <div className='flex'>
              <div className='flex initial w-[64px]'><DuoIcon/></div>
              <div>Meeting ended: 14s</div>
            </div>
            <div><ReplyIcon/> Reply</div>
        </div>
    </div>
  )
}
