import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



const CheckAuth = () => {
    const Navigate = useNavigate();
    useEffect(()=>{
        Navigate('/login');
    })
  return (
    <div></div>
  )
}

export default CheckAuth