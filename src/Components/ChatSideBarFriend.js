import Avatar from "../Images/profile.jpg"
import { useSelector } from 'react-redux'
import { fetchMessages } from '../Redux/messages/messageActions';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";

function ChatSideBarFriend({ c }) {
  const dispatch=useDispatch();
  const currUser = useSelector(state => { return state.user });
  const f=useSelector(state=>{return state.conversations});
  let friendid;
  

  if (c.members[0] === currUser.user.id) {
    friendid = c.members[1];
  }

  else {
    friendid = c.members[0];
  }

  let friend;

  for(let i=0;i<f.friends.length;i++)
  {
    // console.log(f.friends[i]._id,friendid);
    if(f.friends[i]._id===friendid)
    {
      friend=f.friends[i];
      break; 
    }
  }

  return (
    <div className='flex p-3 cursor-pointer hover:bg-white' onClick={()=>{dispatch(fetchMessages({conversation:c,friend}))}}>
      <div id='profileImg'>
        <img src={Avatar} className="w-10 h-10 rounded-full" alt="" />
      </div>
      <div id='profileName' className='flex items-center p-2'>
        {friend.firstName+" "+friend.lastName}
      </div>
    </div>
  )
}

export default ChatSideBarFriend
