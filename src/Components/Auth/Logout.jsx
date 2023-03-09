import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext/AuthContext';

const Logout = () => {
    const {redirectLogin, setRedirectLogin} = useContext(AuthContext);
    const Navigate = useNavigate();

    useEffect(() => {
        if(redirectLogin.isTrue === false){
            if(localStorage.getItem('token')){
                setRedirectLogin({isTrue:true, msg:"Successfully Logged out."})
                localStorage.removeItem('token')
                Navigate("/login");
            }
            else{
                setRedirectLogin({isTrue:true, msg:"Please log in first."})
                Navigate("/login");
            }
        }
    }, [])
    
    return (
        <></>
    )
}

export default Logout