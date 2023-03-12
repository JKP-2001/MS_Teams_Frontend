import GrpContext from "./GrpContext";
import { useState } from "react";
import axios from "axios";
import showToast from "../../Utils/showToast";


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

    const createGrpPost = async(id,content)=>{
        let formData = new FormData();    //formdata object
        formData.append('grp_id', id);   //append the values with key, value pair
        formData.append('content', content);
        formData.append('type', 'post');

        const response = await axios({
            method: "post",
            url: `${url}/grp/newpost`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" , 'security-key': key,
            'auth-token':localStorage.getItem('token')},
          })
        //   console.log(response)
    }

    const delAPost = async(grpid,postid)=>{

        const response = await fetch(`${url}/grp/deletepost`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key,
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({grp_id:grpid, type:"post", postId:postid})
        });
        const json = await response.json();
        if(!json.success){
            showToast({
                msg:json.error.substring(json.error.indexOf(':') + 1),
                type:"error",
                duration:3000
            })
        }
        return json;
    }

    const editAGrpPost = async(grpid,postid,content)=>{

        const response = await fetch(`${url}/grp/editpost`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key,
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({grp_id:grpid, type:"post", postId:postid, content:content})
        });
        const json = await response.json();
        if(!json.success){
            showToast({
                msg:json.error.substring(json.error.indexOf(':') + 1),
                type:"error",
                duration:3000
            })
        }
        return json;
    }


    const addAdmin = async(grpid,email)=>{

        const response = await fetch(`${url}/group/admin/${grpid}?action=add`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key,
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({email})
        });
        const json = await response.json();
        if(!json.success){
            showToast({
                msg:json.error.substring(json.error.indexOf(':') + 1),
                type:"error",
                duration:3000
            })
        }
        return json;
    } 

    const removeAdmin = async(grpid,email)=>{

        const response = await fetch(`${url}/group/admin/${grpid}?action=delete`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key,
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({email})
        });
        const json = await response.json();
        if(!json.success){
            showToast({
                msg:json.error.substring(json.error.indexOf(':') + 1),
                type:"error",
                duration:3000
            })
        }
        return json;
    }
    
    return (
    <GrpContext.Provider value={{grpState,setgrpState,joinTeamByCode,createAGrp,click,setClick, createGrpPost, delAPost, editAGrpPost,addAdmin, removeAdmin}}>
        {props.children}
    </GrpContext.Provider>
    );
}

export default GrpState