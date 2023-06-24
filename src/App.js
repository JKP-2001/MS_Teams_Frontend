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
import { getUserProfile, setUserAuthState } from './Redux/authentication/authSlice';
import CreateAssignment from './Components/TeamsInternalComponents/MeetCards/CreateAssignment';
import { fetchConversations } from './Redux/conversations/conversationActions';
import { addmessage } from './Redux/messages/messageActions';
import { Socket } from './SocketClient';
import chatContext from './Context/ChatContext/chatContext';
import { fetchOnlineUsers } from './Redux/onlineUsers/onlineUserActions';
import { fetchUserSuccess } from './Redux/user.js/userSlice';
import Profile from './Components/TeamsInternalComponents/Profile';
import ProtectedRoute from './Utils/ProtectedRoute';
import CheckAssignment from './Components/TeamsInternalComponents/CheckAssignment';
import ChatPage from './Components/Chat/ChatPage';
import { setMessages } from './Redux/SearchUser/searchUserSlice';


function App() {
  let [arrivalMessage, setArrivalMessage] = useState(null);
  // const { connectSocket, getMessage } = useContext(chatContext);
  const UserState = useSelector(state => { return state.auth });
  const { messages } = useSelector(state => { return state.messages });
  const dispatch = useDispatch();

  const searchUserState = useSelector(state => { return state.searchedUsers });

  


  useEffect(() => {
    dispatch(getUserProfile());
  }, [])

  useEffect(() => {
    if (UserState.data !== null) {
      Socket.emit("setup",UserState.data);
        

        Socket.on("connection",()=>{
            // setSocketConnected(true);
    })}
  }, [UserState.data])


  // useEffect(() => {

  

    

  // const u = useRef(user)

  // useEffect(() => {
  //   dispatch(fetchUser());
  //   dispatch(fetchConversations());
  //   // dispatch(fetchUserSuccess(u));
  // }, [])

  useEffect(() => {
    Socket?.on("message received", (newMessage) => {
      // if(newMessage._id===searchUserState.cu)
      // console.log({newMessage})

      const updatedMessages = [...searchUserState.messages, newMessage];
      dispatch(setMessages(updatedMessages));
      // if(searchUserState.currentOpenChat && newMessage.chat._id === searchUserState.currentOpenChat._id){
      //   const updatedMessages = [...searchUserState.messages, newMessage];
      //   dispatch(setMessages(updatedMessages));
      // }
      // else{
      //   return;
      // }

    })
  }, [searchUserState.messages])

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


  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, [])



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
              <Route path="/" element={<Home />}></Route>

              
                <Route exact path="/home" element={<ProtectedRoute ele={<RenderingFirst />}/>} />
                <Route exact path="/profile" element={<ProtectedRoute ele={<Profile />}/>} />
                <Route path='/chats' element={<ProtectedRoute ele={<ChatPage />}/>}></Route>
                <Route path='/logout' element={<ProtectedRoute ele={<Logout />}/>}></Route>
                
                <Route exact path="/grp/:id" element={<ProtectedRoute ele={<GeneralComponent />}/>} />

                <Route exact path="/assignment" element={<ProtectedRoute ele={<AllAssignment />}/>} />

                <Route exact path="/assignment/:grpid/:postid" element={<ProtectedRoute ele={<ParticularAssignment />}/>} />
                
                <Route exact path="/discover" element={<ProtectedRoute ele={<JoinOrCreate />}/>} />

                <Route exact path="/test" element={<ProtectedRoute ele={<Second />}/>} />

                <Route exact path="/createassignment/:id" element={<ProtectedRoute ele={<CreateAssignment />}/>} />

                <Route exact path="/assignment/check/:grpid/:postid/:user_id" element={<ProtectedRoute ele={<CheckAssignment />}/>} />

            </Routes>
          </Router>
          {/* <Toaster /> */}
        </ChatState>
      </AuthState>
    </GrpState>
  );
}

export default App;
