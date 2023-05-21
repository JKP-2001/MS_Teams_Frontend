import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import RenderingFirst from "./Components/RenderingPages/RenderingFirst";
import Chats from './Pages/Chats';
import ChatState from './Context/ChatContext/chatState';
import Home from "./Components/Auth/Home"

import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from "./Redux/user.js/userActions";
import { useContext, useEffect, useRef, useState } from 'react';
import { Toaster } from "react-hot-toast";

import GeneralComponent from "./Components/TeamsInternalComponents/GeneralComponent"
import AllAssignment from './Components/TeamsInternalComponents/AllAssignment';
import ParticularAssignment from './Components/TeamsInternalComponents/ParticularAssignment';
import JoinOrCreate from './Components/RenderingPages/JoinOrCreate';
import Second from './Components/RenderingPages/Second';
import GrpState from './Context/GrpContext/GrpState';

import SignupForm from "./Components/Auth/SignupForm"
import Login from './Components/Auth/Login';
import ForgotPassword from "./Components/Auth/ForgotPassword";
import SetNewPassword from "./Components/Auth/SetNewPassword";
import CreateNewPassword from "./Components/Auth/CreateNewPassword";
import LoginOtp from './Components/Auth/LoginOtp';
import AuthState from "./Context/AuthContext/AuthState"
import Logout from "./Components/Auth/Logout"
import CheckAuth from './Components/CheckAuth';
import { setUser } from '@sentry/react';
import { setUserAuthState } from './Redux/authentication/authSlice';
import CreateAssignment from './Components/TeamsInternalComponents/MeetCards/CreateAssignment';
import { fetchConversations } from './Redux/conversations/conversationActions';
import { addmessage } from './Redux/messages/messageActions';
import { Socket } from './SocketClient';
import chatContext from './Context/ChatContext/chatContext';
import { fetchOnlineUsers } from './Redux/onlineUsers/onlineUserActions';
import { fetchUserSuccess } from './Redux/user.js/userSlice';
import Profile from './Components/TeamsInternalComponents/Profile';


function App() {
  let [arrivalMessage,setArrivalMessage] = useState(null);
  // const { connectSocket, getMessage } = useContext(chatContext);
  const { user } = useSelector(state => { return state.user });
  const { messages } = useSelector(state => { return state.messages });
  const dispatch = useDispatch();

  // const u = useRef(user)

  // useEffect(() => {
  //   dispatch(fetchUser());
  //   dispatch(fetchConversations());
  //   // dispatch(fetchUserSuccess(u));
  // }, [])

  // useEffect(() => {
  //   Socket?.on("getMessage", (message) => {
  //     setArrivalMessage(message);
  //   })
  // }, [])

  // useEffect(()=>{
  //   if(arrivalMessage!==null)
  //   {
  //     let newMessages=[...messages,arrivalMessage];
  //     dispatch(addmessage({newMessages}));
  //     setArrivalMessage(null);
  //   }
  // },[arrivalMessage])

  // useEffect(() => {

  //   if (user !== null) {
  //     Socket?.emit("addUser", user.id);
  //   }

  //   Socket?.on("getUsers", (onlineUsers) => {
  //     dispatch(fetchOnlineUsers(onlineUsers));
  //   })

  // }, [user])
  
  


  return (
    <GrpState>
      <AuthState>
        <ChatState>
          <Toaster />
          <Router>
            <Routes>

              <Route path='/signup' element={<SignupForm />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/verify-account' element={<LoginOtp />}></Route>
              <Route path='/forgot-password' element={<ForgotPassword />}></Route>
              <Route path='/set-new-password/:token' element={<SetNewPassword />}></Route>
              <Route path='/create-password/:token' element={<CreateNewPassword />}></Route>


              <Route exact path="/home" element={<RenderingFirst />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route path='/chats' element={<Chats />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path='/logout' element={<Logout />}></Route>
              <Route exact path="/home" element={<RenderingFirst />} />
              <Route exact path="/grp/:id" element={<GeneralComponent />} />
              <Route exact path="/assignment" element={<AllAssignment />} />
              <Route exact path="/assignment/:grpid/:postid" element={<ParticularAssignment />} />
              <Route exact path="/discover" element={<JoinOrCreate />} />
              <Route exact path="/test" element={<Second />}/>
              <Route exact path="/createassignment/:id" element={<CreateAssignment />}/>
            </Routes>
          </Router>
          {/* <Toaster /> */}
        </ChatState>
      </AuthState>
    </GrpState>
  );
}

export default App;
