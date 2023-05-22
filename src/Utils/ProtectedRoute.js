import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import RenderingFirst from '../Components/RenderingPages/RenderingFirst';
import showToast from './showToast';





const ProtectedRoute = (props) => {
    
    const key = "PLACEMENT-PROJECT";
    const url = process.env.REACT_APP_BASE_DEV_URL;
    const navigate = useNavigate();

    const [check, setCheck] = useState(false);

    useEffect(()=>{

        if(localStorage.getItem('token')){
            const check = async()=>{
                const response = await fetch(`${url}/auth/check-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'security-key': key,
                        'auth-token':localStorage.getItem('token')
                    },
                });
                const json = await response.json();
                
                if(!json.success){
                    localStorage.removeItem('token')
                    navigate("/login")

                    showToast({
                        msg: "Session expired, please login again.",
                        type: "error",
                        duration: 3000
                    })
                }
                
                else if(json.success){
                    setCheck(true);
                }
            }

            check();
        }
        else{
            navigate("/login")
            showToast({
                msg: "Please login first.",
                type: "error",
                duration: 3000
            })
        }

    },[])

    

    return props.ele;

}

export default ProtectedRoute