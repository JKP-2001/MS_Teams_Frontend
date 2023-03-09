import GrpContext from "./GrpContext";
import { useState } from "react";


const GrpState=(props)=>{

    const [grpState,setgrpState]=useState("general");

    const [click, setClick] = useState("");

    const url = "http://localhost:5000/teams_clone/v1"
    const key = "PLACEMENT-PROJECT";

    const joinTeamByCode = async (code) => {
        const response = await fetch(`${url}/group/joinbycode`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key,
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({ grp_code:code})
        });
        const json = await response.json();
        return json;
        // return(json);
    }


    const createAGrp = async(name,desc,isPrivate)=>{
        const response = await fetch(`${url}/group/createnewgrp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key,
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({ name:name, desc:desc, public:!isPrivate})
        });
        const json = await response.json();
        return json;
        // console.log({grp:json});
    }
    
    return (
    <GrpContext.Provider value={{grpState,setgrpState,joinTeamByCode,createAGrp,click,setClick}}>
        {props.children}
    </GrpContext.Provider>
    );
}

export default GrpState