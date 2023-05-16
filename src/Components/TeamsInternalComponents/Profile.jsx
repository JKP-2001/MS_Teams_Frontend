import React, { useContext, useEffect } from 'react'
import NavbarCoponent from '../NavbarComponet/NavbarCoponent'
import SideBarComponent from '../SideBarComponent/SideBarComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../Redux/authentication/authSlice'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext/AuthContext'
import { setLoading } from '../../Redux/authentication/authSlice'
import { userGroups } from '../../Redux/authentication/authSlice'

const Profile = () => {

    const Navigate = useNavigate();

    const { homePage, setHomePage } = useContext(AuthContext);
    const { redirectLogin, setRedirectLogin } = useContext(AuthContext
    );

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            setRedirectLogin({ isTrue: true, msg: "Please Logged In First" });
            Navigate("/login");
        }

        dispatch(getUserProfile());
        setLoading(true);
        dispatch(userGroups());
        setLoading(false);
    }, []);

    const { user } = useSelector(state => { return state.user });
    const dispatch = useDispatch();

    return (
        <>
            <NavbarCoponent />
            <div>
                <div>
                    <SideBarComponent />
                </div>
                <div class="mt-20 mx-6 min-[713px]:ml-32">
                    <div class="flex items-center justify-center">
                        <div class="bg-white shadow-xl rounded-lg py-3 ">
                            <div className='max-w-3xl'>
                                <div class="photo-wrapper p-2">
                                    <img class="w-32 h-32 rounded-full mx-auto" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg" alt="John Doe" />
                                </div>
                                <div class="p-2">
                                    <h3 class="text-center text-2xl text-gray-900 font-medium leading-8">{user.firstName +" " + user.lastName}</h3>
                                    {/* <div class="text-center text-gray-400 text-base font-semibold">
                                        <p>Web Developer</p>
                                    </div> */}
                                    <table class="text-xs my-3">
                                        <tbody>
                                            <tr>
                                                <td class="px-2 py-2 text-gray-500 font-semibold text-xl">Email</td>
                                                <td class="px-2 py-2 text-lg">{user.email}</td>
                                            </tr>
                                        </tbody></table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile


{/* 
<div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            User Profile
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            This is some information about the user.
                        </p>
                    </div>
                    <div class="flex border-t border-gray-200 px-4 py-5 sm:p-0">
                        {/* <div></div> */}
{/* <dl class="sm:divide-y sm:divide-gray-200">
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Name
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    
                                </dd>
                            </div>
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Email address
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    
                                </dd>
                            </div>
                        </dl>
                    </div> */} 