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
                <div class="mt-20 mx-6 min-[713px]:ml-32 bg-white overflow-hidden shadow rounded-lg border">
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
                        <dl class="sm:divide-y sm:divide-gray-200">
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Name
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.firstName +" " + user.lastName}
                                </dd>
                            </div>
                            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">
                                    Email address
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.email}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile