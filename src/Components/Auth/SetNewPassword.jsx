import React, { useContext, useState } from 'react'
import mic_logo from "../../Images/mic_logo.png"
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext/AuthContext'
import Alert from '../Alert'
import showToast from '../../Utils/showToast'

const SetNewPassword = () => {
    const { resetPassword, setRedirectLogin } = useContext(AuthContext);
    const [user, setUser] = useState({ password: "", confPassword: "" });
    const detectChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const [alert, setAlert] = useState(null);
    const Navigate = useNavigate();

    const showAlert = (type, message, time) =>
        setAlert({
            msg: message,
            type: type
        },
            setTimeout(() => {
                setAlert(null);
            }, time));

    const params = useParams();
    const token = params.token;

    const submit = async () => {
        const json = await resetPassword(user.password, token);
        if (json.detail === "TokenExpiredError: jwt expired") {
            showToast({
                msg:"Link Expires",
                type:"error",
                duration:4000
            })
            setUser({ password: "", confPassword: "" });
        }
        else if(json.success){
            setUser({ password: "", confPassword: "" });
            setRedirectLogin({isTrue:true, msg:"Password changed successfully."});
            Navigate("/login");
        }
    };

    return (
        <>
            <title>Reset password</title>
            {alert && <Alert alert={alert}/>}
            <section className="bg-gray-50 dark:bg-[#e6dad6] h-auto py-56 md:py-0">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                            <img className="w-28 h-auto mr-2" src={mic_logo} alt="logo" />
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Reset Password
                            </h1>

                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input type="password" name="password" value={user.password} onChange={detectChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"  >Confirm Password</label>
                                    <input type="password" name="confPassword" value={user.confPassword} onChange={detectChange} id="confPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                {user.password === "" || user.confPassword === "" || user.password !== user.confPassword ? <div type="button" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 opacity-40">Submit</div> :
                                    <div type="button" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={submit}>Submit</div>}
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Back To Login Page. <Link to='/login' className="font-medium text-blue-600 hover:underline dark:text-primary-500">Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SetNewPassword