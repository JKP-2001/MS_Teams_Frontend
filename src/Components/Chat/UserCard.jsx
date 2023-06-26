import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllChats, fetchOrCreateChat, setAllChats } from '../../Redux/SearchUser/searchUserSlice';
import { Badge, Button } from "@material-tailwind/react";

const UserCard = (props) => {
    const params = useParams();
    const closeDrawer = props.closeDrawer;

    const searchUserState = useSelector((state) => state.searchedUsers);



    const dispatch = useDispatch();

    const handleClick = () => { 

        closeDrawer();
        
        if(props.userId){
            dispatch(fetchOrCreateChat(props.userId));
        }

    }

    return (
        <>  
            
            <div className="relative my-1 px-1 w-full min-[713px]:w-full hover:cursor-pointer" onClick={handleClick} >
                    
                    <article className="overflow-auto rounded-lg border-2 
            hover:shadow-xl bg-white">
                        {/* <div className="absolute flex justify-between right-3 p-1">
                    <div></div>
                    {props.grpid?<MemberDropDown email={props.email} grpid={props.grpid} role={props.role} isOwner={props.isOwner}/>:null}
                </div> */}
                        <footer className="flex items-center leading-none pl-2 pr-2 pb-2 md:pl-2 md:pr-4 md:pb-4 mt-3">
                            <a className="flex items-center no-underline hover:underline text-black mx-2" href="#">
                                <img alt="Placeholder" className="block rounded-full h-auto w-auto" src="https://picsum.photos/32/32/?random" />
                            </a>
                            <div className='pl-1'>
                                <p className="ml-1 text-sm font-semibold break-words">
                                    {props.name}
                                </p>
                                <p className="ml-1 text-sm break-words">
                                    Email: {props.email}
                                </p>
                            </div>
                        </footer>
                    </article>
            </div>

        </>
    )
}

export default UserCard