import React, { useContext, useEffect} from 'react'
import hpi2 from "../../Images/hpi2.jpeg";
import child1 from "../../Images/child1.jpeg";
import education from "../../Images/education.jpeg";
import enterprise from "../../Images/enterprise.jpeg";
import buisness from "../../Images/buisness.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import micro_fav from "../../Images/micro.ico"
import Navbar from './Navbar';
import AuthContext from '../../Context/AuthContext/AuthContext';
// import teams from "../../images/teams.ico"
import teams1 from "../../Images/teams1.png"
import teams2 from "../../Images/teams2.png"
import teams3 from "../../Images/teams3.png"
import teams4 from "../../Images/teams4.png"
import teams5 from "../../Images/teams5.png"
import teams6 from "../../Images/teams6.png"


function Home() {
    return (
        <>
        {/* <link rel="icon" href={micro_fav} /> */}
        <title>Video Conferencing, Meetings, Calling | Microsoft Teams</title>
        <Navbar />
        <section className='bg-white'>
            <div className="topbar h-14 w-full bg-[#4b53bc] justify-center items-center flex">
                <div className="text-white font-semibold font-gSans text-center py-3"><h3>The better way to meet: My Classroom Premium Discover more</h3></div>
            </div>

            <div className=" slider1 flex flex-col-reverse my-14 md:flex-row justify-center items-center px-11">

                <div className="left w-screen">
                    <div className="text-l4 text-[#4b53bc] text-[1.8125rem] md:text-6xl font-gSans font-semibold items-baseline px-5 md:w-10">My Classroom</div>
                    <div className="textl3 text-[1.2rem] md:text-2xl px-6 font-semibold my-4 md:w-64 font-gSans">Make amazing things happen together at home, work, and school.</div>
                    <Link to="/signup"><button className="bg-[#4b53bc] hover:bg-[#2a307f] text-white ml-3 font-bold md:ml-6 w-11/12 md:w-3/5 my-3 py-2 px-4 border border-blue-700 rounded">
                        SignUp For Free
                    </button></Link>
                    <Link to="/login"><button className="bg-[#4b53bc] hover:bg-[#2a307f] text-white font-bold mx-3 md:ml-6 w-11/12 md:w-3/5 my-3 py-2 px-4 border border-blue-700 rounded">
                        Signin 
                    </button></Link>
                    {/* <div className="textl3 text-[#4b53bc] text-[1.2rem] px-3 font-semibold my-4 w-24"><Link to="/login">Sign in.</Link></div> */}
                </div>

                <div className="right pl-16 justify-center items-center">
                    <div className="image w-full"><img src={hpi2} alt="" /></div>
                </div>
            </div>



            <div className="slider2 flex flex-col my-4 md:flex-row justify-center items-center">

                <div className="center w-screen justify-center items-center ">
                    <div className="textl3 text-[1.5rem] px-3 font-semibold my-4 mx-8">More is possible with My Classroom</div>
                    <div className="textl3 text-[1rem] px-3 leading-5 font-semibold my-4 mx-8">Stay connected and access shared content any time to learn, plan, and innovate together.</div>

                </div>

                <div className="right my-4 flex space-x-2 flex-flow-col mx-2">
                    <div className="image w-fit"><img src={child1} alt="" /></div>
                    <div className="image w-fit"><img src={enterprise} alt="" /></div>

                </div>

                <div className="right my-4 flex space-x-2 flex-flow-col mx-2">
                    <div className="image w-fit"><img src={buisness} alt="" /></div>
                    <div className="image w-fit"><img src={education} alt="" /></div>
                </div>

            </div>


            <div className="slider3 flex flex-col my-4 md:flex-row justify-center items-center">


                <div className="right my-4 flex space-x-2 flex-flow-col mx-2">
                    <div className="image w-fit rounded-md"><img className=' border-2 border-black rounded-lg' src={teams5} alt="" /></div>
                </div>

                <div className="center w-screen justify-center items-center">
                    <div className="textl3 text-[1.5rem] px-3 font-semibold my-4 mx-8">Notes</div>
                    <div className="textl3 text-[1rem] px-3 leading-5 font-normal my-4 mx-8">Efficiency and organization go hand in hand. Let Notes be your digital ally in conquering the realm of work.</div>

                </div>

            </div>



            <div className="slider3 flex flex-col my-4 md:flex-row ">


                <div className="right my-4 flex space-x-2 flex-flow-col mx-2">
                    <div className="image w-fit"><img src={teams6} className=' border-2 border-black rounded-lg' alt="" /></div>
                </div>

                <div className="center w-screen justify-center items-center">
                    <div className="textl3 text-[1.5rem] px-3 font-semibold my-4 mx-8">Classroom</div>
                    <div className="textl3 text-[1rem] px-3 leading-5 font-normal my-4 mx-8">Elevate education and connectivity with our virtual classroom feature – where learning knows no bounds, and knowledge finds its online home.</div>

                </div>

            </div>


            <div className="slider3 flex flex-col my-4 md:flex-row ">


                <div className="right my-4 flex space-x-2 flex-flow-col mx-2">
                    <div className="image w-fit"><img src={teams3} className=' border-2 border-black rounded-lg' alt="" /></div>
                </div>

                <div className="center w-screen justify-center items-center">
                    <div className="textl3 text-[1.5rem] px-3 font-semibold my-4 mx-8">Assignment</div>
                    <div className="textl3 text-[1rem] px-3 leading-5 font-normal my-4 mx-8">Seamlessly bridge the gap between mentorship and progress with our Assignment feature. Empowering mentors to guide, and students to shine.</div>

                </div>

            </div>


            <div className="slider3 flex flex-col my-4 md:flex-row ">


                <div className="right my-4 flex space-x-2 flex-flow-col mx-2">
                    <div className="image w-fit"><img src={teams2} className=' border-2 border-black rounded-lg' alt="" /></div>
                </div>

                <div className="center w-screen justify-center items-center">
                    <div className="textl3 text-[1.5rem] px-3 font-semibold my-4 mx-8">Chat</div>
                    <div className="textl3 text-[1rem] px-3 leading-5 font-normal my-4 mx-8">Share your thoughts and your personality. Send message to one another.</div>

                </div>

            </div>

            <div className="topbar h-16 w-full bg-[#4b53bc] justify-center flex py-12 items-center">
                <div className="text-white text-center py-3"><h3>Get started with My Classroom today</h3></div>
            </div>
        </section>
        </>

    )
}

export default Home