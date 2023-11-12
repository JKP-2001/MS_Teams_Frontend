import React from 'react'
import user from "../../Images/user.png"
import { Link } from 'react-router-dom';

import logo from "../../Images/mic_logo2.png"

const Navbar = () => {
    return (
        <>
        
            <div className=" navbar flex justify-between items-center md:px-24 md:my-4 ">
                <div className="hamburger inline-block p-4 md:hidden justify-between items-center">
                    <div className="line h-0.5 w-6 my-1 bg-black"></div>
                    <div className="line h-0.5 w-6 my-1 bg-black"></div>
                    <div className="line h-0.5 w-6 my-1 bg-black"></div>
                </div>
                <div className="logo text-center md:h-1.5 flex justify-between items-center ">
                    <Link to="/"><div className='max-w-md'><img className="max-w-md h-8" src={logo} alt="" /></div></Link>
                    {/* <div className="teamsname md:visible md:pl-8 text">Teams</div> */}

                    <div className="feature -translate-x-96 md:translate-x-0 md:mx-5 absolute md:static md:flex md:visible space-x-3 ">
                        <div className="md:visible fitem"><Link>Home</Link></div>
                        <div className="md:visible fitem"><Link>Office</Link></div>
                        <div className="md:visible fitem"><Link>Classroom</Link></div>
                        <div className="md:visible fitem"><Link>Resources</Link></div>
                    </div>
                </div>

                <Link to="/login"><div className="account   flex w-6 mr-5 md:w-8"><img src={user} alt="" /></div></Link>
            </div>
            </>
    )
}

export default Navbar