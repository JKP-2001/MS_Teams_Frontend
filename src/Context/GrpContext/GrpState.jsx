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

    const createGrpPost = async(id,content,uploadedFiles)=>{
        let formData = new FormData();    //formdata object
        formData.append('grp_id', id);   //append the values with key, value pair
        formData.append('content', content);
        formData.append('type', 'post');

        uploadedFiles.map((file)=>{
            formData.append("files", file);
        })

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

    const editAGrpPost = async(grpid,postid,content,deletedItems,uploadedFiles)=>{
        
        let formData = new FormData();    //formdata object
        formData.append('grp_id', grpid);   //append the values with key, value pair
        formData.append('content', content);
        formData.append('type', 'post');
        formData.append('postId', postid);
        // const dele = ["apple", "ball", "cat"]
        deletedItems.forEach((item) => formData.append("deletedItems[]", item))
        // formData.append('deletedItems',deletedItems)


        uploadedFiles.map((file)=>{
            formData.append("files", file);
        })

        const response = await axios({
            method: "patch",
            url: `${url}/grp/editpost`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" , 'security-key': key,
            'auth-token':localStorage.getItem('token')},
          })

        // const response = await fetch(`${url}/grp/editpost`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'security-key': key,
        //         'auth-token':localStorage.getItem('token')
        //     },
        //     body: JSON.stringify({grp_id:grpid, type:"post", postId:postid, content:content})
        // });
        const json = response.data;
        // console.log(response)
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

    const resetGrpCode = async(grpid)=>{

        const response = await fetch(`${url}/group/resetcode`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key,
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({group_id:grpid})
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

    const postAssignment = async(id,title,instructions,deadline,uploadedFiles)=>{
        let formData = new FormData();    //formdata object
        formData.append('grp_id', id);   //append the values with key, value pair
        formData.append('title', title);
        formData.append('instructions', instructions);
        formData.append('deadline', deadline);
        formData.append('points', 100);

        uploadedFiles.map((file)=>{
            formData.append("assignments", file);
        })

        const response = await axios({
            method: "post",
            url: `${url}/grp/newassignment`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" , 'security-key': key,
            'auth-token':localStorage.getItem('token')},
          })

        const json = response.data;
        if(!json.success){
            showToast({
                msg:json.error.substring(json.error.indexOf(':') + 1),
                type:"error",
                duration:3000
            })
        }
        return json;
    }

    const getAssignmentById = async(grpid,assid)=>{
        const response = await fetch(`${url}/grp/assignment/${assid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key,
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({grp_id:grpid})
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

    
    let BaseUrl=process.env.REACT_APP_BASE_URL;
    const [keywordUsers,setKeyWordUsers] = useState([]);

    const fetchKeyWordUser  = async (keyword)=>{
        let url=`${BaseUrl}/account/user/fetchKeywordUser`
        let response = await fetch(url,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem('token'),
                "security-key":"PLACEMENT-PROJECT"
            },
            body:JSON.stringify({keyword})
        })
        response =await response.json();
        // console.log({response});
        if(response.success)
        {
            setKeyWordUsers(response.users);
        }

    }

    
    
    return (
    <GrpContext.Provider value={{grpState,setgrpState,joinTeamByCode,createAGrp,click,setClick, createGrpPost, delAPost, editAGrpPost,addAdmin, removeAdmin, resetGrpCode, postAssignment, getAssignmentById, fetchKeyWordUser,keywordUsers}}>
        {props.children}
    </GrpContext.Provider>
    );
}

export default GrpState