import React, { useContext, useEffect, useState } from 'react'
import mic_logo from "../../Images/mic_logo.png"
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext/AuthContext'
import Alert from '../Alert'
import showToast from '../../Utils/showToast'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, setAuthenticated } from '../../Redux/authentication/authSlice'
import { fetchUser } from '../../Redux/user.js/userActions'



const LoginOtp = () => {
    const { redirectOTP, setRedirectOTP, checkOTP, homePage, setHomePage, setRedirectLogin, redirectLogin } = useContext(AuthContext);

    const Navigate = useNavigate();

    const [alert, setAlert] = useState(null);
    const [otp, setOtp] = useState("");
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem('otp-token') && redirectLogin.isTrue === false) {
            setRedirectLogin({ isTrue: true, msg: "Please login first" });
            Navigate("/login");
        }
        else if (redirectOTP.isTrue) {
            // showAlert("success",redirectOTP.msg,3000);
            showToast({
                msg: redirectOTP.msg,
                type: "success",
                duration: 5000,
            })
            setRedirectOTP({ isTrue: false, msg: "" });
        }
    }, []);

    const detectChange = (e) => {
        setOtp(e.target.value);
    }

    const submit = async () => {

        if (localStorage.getItem('otp-token') === null) {
            showToast({
                msg: "Inavlid Request",
                type: "error",
                duration: 3000
            })
            setOtp("");
        }

        else {
            setLoading(true);
            const json = await checkOTP(otp);
            setLoading(false);

            if (json.error === 'Error: Token Not Found') {
                showToast({
                    msg: "Restricted Page",
                    type: "error",
                    duration: 3000
                })
                setOtp("");
            }
            else if (json.error === 'TokenExpiredError: jwt expired') {
                showToast({
                    msg: "OTP Expired",
                    type: "error",
                    duration: 5000
                })
                setOtp("");
            }
            else if (json.detail === 'Error: Invalid OTP') {
                showToast({
                    msg: "Invalid OTP",
                    type: "error",
                    duration: 4000
                })
                setOtp("");
            }
            else if (json.success) {
                localStorage.removeItem('otp-token');
                dispatch(setAuthenticated(true));
                localStorage.setItem('token', json.token);
                setOtp("");
                dispatch(getUserProfile());
                dispatch(fetchUser());
                setHomePage({ isTrue: true, msg: "Successfully Logged In."});
                Navigate("/home")
            }
        }
    }

    return (
        <>
            <title>Verify your account</title>
            <section className="bg-gray-50 dark:bg-[#e6dad6] h-auto py-40 md:py-0">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                            <img className="w-28 h-auto mr-2" src={mic_logo} alt="logo" />
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Verify
                            </h1>

                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OTP</label>
                                    <input type="password" name="otp" id="otp" value={otp} onChange={detectChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" maxLength={6} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="items-start">
                                        <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-white">Resend OTP</Link>
                                    </div>

                                    <div className="items-start">
                                        <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-white">Forgot password?</Link>
                                    </div>


                                </div>
                                {otp.length !== 6 ? <button type="button" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 opacity-40">Submit</button> : 
                                !loading?<button type="button" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={submit}>Submit</button>:<button disabled type="button" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center justify-center">
                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                <div className='text-center'>Loading...</div>
                            </button>}

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-primary-500">Create One !</Link>
                                </p>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400"> Back to sign in page.
                                    <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-primary-500">Sigin.</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginOtp