import React, { useContext, useState } from 'react'
import mic_logo from "../../Images/mic_logo.png"
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext/AuthContext'
import Alert from '../Alert'
import showToast from '../../Utils/showToast'

const CreateNewPassword = () => {
    const { createPassword, setRedirectLogin } = useContext(AuthContext);

    const [alert, setAlert] = useState(null);
    const Navigate = useNavigate();

    const params = useParams();
    const token = params.token;
    const [user, setUser] = useState({ password: "", confirmPassword: "" });
    const detectChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const submit = async (e) => {
        e.preventDefault();
        const json = await createPassword(user.password, token);
        if (json.success) {
            showToast({
                msg:"Password Set Successfully",
                type:"success",
                duration:3000
            })
            setRedirectLogin({isTrue:true, msg:"Account created Successfully. You can now login."})
            Navigate("/login");
        }
        else if (json.detail === "Error: Link already used.") {
            showToast({
                msg:"Link already used.",
                type:"danger",
                duration:5000
            })
        }
        else if(json.detail === "TokenExpiredError: jwt expired"){
            showToast({
                msg:"Link expired.",
                type:"danger",
                duration:5000
            })
        }
        setUser({ password: "", confirmPassword: "" });
    }

    return (
        <>
            <title>Create password</title>
            
            {alert && <Alert alert={alert} />}
            <section className="bg-gray-50 dark:bg-[#e6dad6] h-auto py-56 md:py-0">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                            <img className="w-28 h-auto mr-2" src={mic_logo} alt="logo" />
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create Password
                            </h1>

                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" value={user.password} id="password" placeholder="••••••••" onChange={detectChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"  >Confirm Password</label>
                                    <input type="password" name="confirmPassword" value={user.confirmPassword} id="confirmPassword" placeholder="••••••••" onChange={detectChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                {user.password !== user.confirmPassword || user.password === "" ? <div className=" opacity-40 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</div> : <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={submit}>Submit</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateNewPassword