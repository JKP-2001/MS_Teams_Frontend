import React from "react";
import hpi2 from "../Images/hpi2.jpeg";
import child1 from "../Images/child1.jpeg";
import education from "../Images/education.jpeg";
import enterprise from "../Images/enterprise.jpeg";
import buisness from "../Images/buisness.jpeg";
import user from "../Images/user.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [humbClicked, sethumbClicked] = useState(false);
  return (
    <>
      <div className="z-50 md:navbar flex items-center p-2 md:my-3 justify-between  relative md:static">
        {!humbClicked ? (
          <div className="hamburger inline-block p-2 md:hidden cursor-pointer" onClick={()=>{sethumbClicked(true)}}>
            <div className="line h-0.5 w-6 my-1 bg-black"></div>
            <div className="line h-0.5 w-6 my-1 bg-black"></div>
            <div className="line h-0.5 w-6 my-1 bg-black"></div>
          </div>
        ) : (
          <div className="inline-block cursor-pointer p-2 text-xl md:hidden" onClick={()=>{sethumbClicked(false)}}>
            <div>&#10006;</div>
          </div>
        )}
        <div className=" w-28 cursor-pointer md:hidden flex  items-center">
          <img
            src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31"
            alt=""
          />
        </div>
        <div className="logo text-center md:h-1.5 flex">
          <div className=" md:mx-5 md:flex  space-x-3 justify-center items-center absolute md:static top-12 left-0">
            <div className="w-28 cursor-pointer hidden md:block">
              <img
                src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31"
                alt=""
              />
            </div>
            <div className="text-3xl mb-2 hidden md:block">
              <span>&#124;</span>
            </div>
            <h1 className="hidden md:block fitem font-bold text-lg">
              <Link>Teams</Link>
            </h1>
            <div className=" hidden md:block fitem">
              <Link>Microsoft 365</Link>
            </div>
            <div className="hidden md:block fitem">
              <Link>Office</Link>
            </div>
            <div className="hidden md:block fitem">
              <Link>Windows</Link>
            </div>
            <div className="hidden md:block fitem">
              <Link>Resources</Link>
            </div>
          </div>
        </div>

        <div className="account  md:h-6  w-6 cursor-pointer mr-5">
          <img src={user} alt="" />
        </div>
      </div>
      {
      humbClicked&&<div  className="md:hidden flex flex-col max-w-screen-md bg-[#e6e6e6] p-3">
        <div className="py-2 cursor-pointer border-b-2 border-gray-300">
          <Link>Microsoft 365</Link>
        </div>
        <div className="py-2 cursor-pointer border-b-2 border-gray-300">
          <Link>Office</Link>
        </div>
        <div className="py-2 cursor-pointer border-b-2 border-gray-300">
          <Link>Windows</Link>
        </div>
        <div className="py-2 cursor-pointer border-b-2 border-gray-300">
          <Link>Resources</Link>
        </div>
        <div className="py-2 cursor-pointer border-b-2 border-gray-300">
          <Link>Education</Link>
        </div>
        <div className="py-2 cursor-pointer border-b-2 border-gray-300">
          <Link>Contact Us</Link>
        </div>
      </div>
    }
      <div className="topbar h-16 w-full bg-[#4b53bc] justify-center items-center flex">
        <div className="text-white font-semibold text-center py-3">
          <h3>The better way to meet: Microsoft Teams Premium Discover more</h3>
        </div>
      </div>
      <div className=" md:hidden slider1 flex flex-col-reverse my-14 md:flex-row justify-center items-center px-6">
        <div className="left w-screen">
          <div className="text-l4 text-[#4b53bc] text-[1.8125rem] font-semibold items-baseline px-3">
            Microsoft Teams
          </div>
          <div className="textl3 text-[1.2rem] px-3 font-semibold my-4">
            Make amazing things happen together at home, work, and school.
          </div>
          <button className="bg-[#4b53bc] hover:bg-[#2a307f] text-white font-bold w-full my-3 py-2 px-4 border border-blue-700 rounded">
            SignUp For Free
          </button>
          <button className="bg-[#4b53bc] hover:bg-[#2a307f] text-white font-bold w-full py-2 px-4 border border-blue-700 rounded">
            SignUp For Free
          </button>
          <div className="textl3 text-[#4b53bc] text-[1.2rem] px-3 font-semibold my-4">
            Sign in.
          </div>
        </div>

        <div className="right my-4">
          <div className="image w-fit">
            <img src={hpi2} alt="" />
          </div>
        </div>
      </div>

      <div className=" md:visible slider1 flex flex-col-reverse my-14 md:flex-row justify-center items-center px-6">
        <div className="left w-screen">
          <div className="text-l4 text-[#4b53bc] text-[1.8125rem] font-semibold items-baseline px-3">
            Microsoft Teams
          </div>
          <div className="textl3 text-[1.2rem] px-3 font-semibold my-4">
            Make amazing things happen together at home, work, and school.
          </div>
          <div>
            <button className="bg-[#4b53bc] hover:bg-[#2a307f] text-white font-bold w-3/4 my-3 py-2 px-4 border border-blue-700 rounded">
              SignUp For Free
            </button>
          </div>
          <div>
            <button className="bg-[#4b53bc] hover:bg-[#2a307f] text-white font-bold w-3/4 py-2 px-4 border border-blue-700 rounded">
              SignUp For Free
            </button>
          </div>
          <div className="textl3 text-[#4b53bc] text-[1.2rem] px-3 font-semibold my-4">
            Sign in.
          </div>
        </div>

        <div className="right my-4">
          <div className="image w-fit">
            <img src={hpi2} alt="" />
          </div>
        </div>
      </div>

      <div className="slider2 flex flex-col my-4 md:flex-row justify-center items-center">
        <div className="center w-screen justify-center items-center">
          <div className="textl3 text-[1.5rem] px-3 font-semibold my-4 mx-8">
            More is possible with Microsoft Teams
          </div>
          <div className="textl3 text-[1rem] px-3 leading-5 font-semibold my-4 mx-8">
            Stay connected and access shared content any time to learn, plan,
            and innovate together.
          </div>
        </div>

        <div className="right my-4 flex space-x-2 flex-flow-col mx-2">
          <div className="image w-fit">
            <img src={child1} alt="" />
          </div>
          <div className="image w-fit">
            <img src={enterprise} alt="" />
          </div>
        </div>

        <div className="right my-4 flex space-x-2 flex-flow-col mx-2">
          <div className="image w-fit">
            <img src={buisness} alt="" />
          </div>
          <div className="image w-fit">
            <img src={education} alt="" />
          </div>
        </div>
      </div>

      <div className="slider3 flex flex-col my-4 md:flex-row justify-center items-center">
        {/* <div className="right my-4 flex space-x-2 flex-flow-col mx-2">
                    <div className="image w-fit"><img src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Meet1:VP1-539x440?resMode=sharp2&op_usm=1.5,0.65,15,0&qlt=100" alt="" /></div>                    
                </div> */}

        <div className="center w-screen justify-center items-center">
          <div className="textl3 text-[1.5rem] px-3 font-semibold my-4 mx-8">
            Meet
          </div>
          <div className="textl3 text-[1rem] px-3 leading-5 font-normal my-4 mx-8">
            Share your screen, change or blur your background, and use together
            mode to virtually be in the same space.
          </div>
        </div>
      </div>

      <div className="slider3 flex flex-col my-4 md:flex-row ">
        <div className="right my-4 flex space-x-2 flex-flow-col mx-2">
          <div className="image w-fit">
            <img
              src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/call1:VP5-1920x600?resMode=sharp2&op_usm=1.5,0.65,15,0&qlt=100&fit=crop"
              alt=""
            />
          </div>
        </div>

        <div className="center w-screen justify-center items-center">
          <div className="textl3 text-[1.5rem] px-3 font-semibold my-4 mx-8">
            Call
          </div>
          <div className="textl3 text-[1rem] px-3 leading-5 font-normal my-4 mx-8">
            Make and receive calls directly in Teams with advanced features like
            group calling, voicemail, and call transfers.
          </div>
        </div>
      </div>

      <div className="slider3 flex flex-col my-4 md:flex-row ">
        <div className="right my-4 flex space-x-2 flex-flow-col mx-2">
          <div className="image w-fit">
            <img
              src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/chat1:VP5-1920x600?resMode=sharp2&op_usm=1.5,0.65,15,0&qlt=85"
              alt=""
            />
          </div>
        </div>

        <div className="center w-screen justify-center items-center">
          <div className="textl3 text-[1.5rem] px-3 font-semibold my-4 mx-8">
            Collaborate
          </div>
          <div className="textl3 text-[1rem] px-3 leading-5 font-normal my-4 mx-8">
            Easily find, share, and edit files together in real time with apps
            like Word, PowerPoint, and Excel.
          </div>
        </div>
      </div>

      <div className="slider3 flex flex-col my-4 md:flex-row ">
        <div className="right my-4 flex space-x-2 flex-flow-col mx-2">
          <div className="image w-fit">
            <img
              src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/collaborate1:VP5-1920x600?resMode=sharp2&op_usm=1.5,0.65,15,0&qlt=100"
              alt=""
            />
          </div>
        </div>

        <div className="center w-screen justify-center items-center">
          <div className="textl3 text-[1.5rem] px-3 font-semibold my-4 mx-8">
            Chat
          </div>
          <div className="textl3 text-[1rem] px-3 leading-5 font-normal my-4 mx-8">
            Share your thoughts and your personality. Send GIFs, stickers, and
            emojis in one-to-one or group chats.
          </div>
        </div>
      </div>

      <div className="topbar h-16 w-full bg-[#4b53bc] justify-center flex py-12 items-center">
        <div className="text-white text-center py-3">
          <h3>Get started with Microsoft Teams today</h3>
        </div>
      </div>
    </>
  );
};

export default Navbar;
