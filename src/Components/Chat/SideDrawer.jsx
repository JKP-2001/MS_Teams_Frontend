import React, { useEffect, useState } from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ChatSideBar from "./ChatSideBar";

import { Input } from "@material-tailwind/react";
import { fetchSearchUser, setSearchUser } from "../../Redux/SearchUser/searchUserSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";


export default function SideDrawer(props) {
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);

    const dispatch = useDispatch();

    const [searchValue,setSearchValue] = useState("");

    const closeDrawer = () => {
        setOpen(false);
        setSearchValue("");
    };


    

    const searchUserState = useSelector((state) => state.searchedUsers);

    // console.log({searchValue})

    useEffect(()=>{
        dispatch(fetchSearchUser(searchValue));
    },[searchValue])


    const detectChange = (e) => {
        console.log({value:e.target.value})
        setSearchValue(e.target.value);
    }

    return (
        searchUserState ? <React.Fragment>
            {/* <Button onClick={openDrawer}>Open Drawer</Button> */}
            <Drawer open={open} onClose={closeDrawer} className="p-4">
                <div className="pb-6 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        Search User
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </div>
                <div className="w-60 ">
                    <Input color="purple" label="Enter Name or Email"  onChange={detectChange} value={searchValue}/>
                </div>
                <div className="mt-4">
                    {searchUserState.users.length>0 ? searchUserState.users.map((user) => {
                        return(<UserCard key={user._id} name={user.firstName+" "+user.lastName} email={user.email}/>)
                    }):null}
                </div>
            </Drawer>
            <ChatSideBar openDrawer={openDrawer} />
        </React.Fragment>:null
    );
}

