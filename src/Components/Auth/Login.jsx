import React, { useContext, useEffect, useState } from 'react'
import mic_logo from "../../Images/mic_logo.png"
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../Alert'
import AuthContext from '../../Context/AuthContext/AuthContext'
import Home from './Home'
import RenderingFirst from '../RenderingPages/RenderingFirst'
import { useDispatch } from 'react-redux'
import showToast from '../../Utils/showToast'



const Login = () => {
  const dispatch = useDispatch();
  const { redirectLogin, setRedirectLogin, sendingdOTP, redirectOTP, setRedirectOTP, setHomePage } = useContext(AuthContext);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({ email: "", password: "" });
  const Navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const detectChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }


  useEffect(() => {
    if (localStorage.getItem('token')) {
      Navigate("/home");
    }
    if (redirectLogin.isTrue) {
      if (redirectLogin.msg === "Please login first") {
        // showAlert("danger", redirectLogin.msg, 3000);
        showToast({
          msg: redirectLogin.msg,
          type: "error"
        })
      }
      else {
        // showAlert("success", redirectLogin.msg, 3000);
        showToast({
          msg: redirectLogin.msg,
          type: "success"
        })
        setRedirectLogin({ isTrue: false, msg: "" });
      }
    }
  }, [])

  const submit = async () => {
    if (!user.email.includes('@')) {
      showToast({
        msg: "Email must include @",
        type: "error",
        duration: 3000
      })
      return;
    }

    setLoading(true);
    const json = await sendingdOTP(user.email, user.password);
    setLoading(false);
    if (json.detail === 'Error: Incorrect Password') {
      showToast({
        msg: "Wrong Credentials",
        type: "error",
      })
      setUser({ email: user.email, password: "" });
    }
    else if (json.success) {
      localStorage.setItem("otp-token", json.token);
      setRedirectOTP({ isTrue: true, msg: "OTP send to your mail id. Please check the inbox" });
      Navigate("/verify-account");
      // showAlert("success","User Found", 3000);
      setUser({ email: "", password: "" });
    }
    if (json.detail === 'Error: User not found') {
      // showAlert("danger", "Incorrect Password", 5000);
      showToast({
        msg: "User Not Found",
        type: "error",
      })
      setUser({ email: user.email, password: "" });
    }
  }


  const func = () => {
    if (localStorage.getItem('token')) {
      setHomePage({ isTrue: true, msg: "Already logged in" });
      return <RenderingFirst />
    }
  }

  useEffect(() => {
    func();
  }, [])

  return (
    <>

      

      <title>Sign in to your account</title>
      {alert && <Alert alert={alert} />}
      <section className="bg-gray-50 dark:bg-gray-200 h-auto py-40 md:py-0">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <img className="w-28 h-auto mr-2" src={mic_logo} alt="logo" />
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in
              </h1>

              <form className="space-y-4 md:space-y-6" >
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" value={user.email} id="email" onChange={detectChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" value={user.password} onChange={detectChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold" required="" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">

                  </div>
                  <Link to="/forgot-password" className="text-sm font-semibold text-primary-600 hover:underline dark:text-blue-600 ">Forgot password?</Link>
                </div>
                {user.email === "" || user.password === "" ? <div type="submit" className="opacity-40 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 z-10">Submit</div> :

                  !loading ? <button type="button" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={submit}>Sign in</button> :
                    <button disabled type="button" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center justify-center">
                      <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                      </svg>
                      <div className='text-center'>Loading...</div>
                    </button>}
                <p className="text-sm font-semibold text-white dark:text-white">
                  Don’t have an account yet? <Link to="/signup" className="font-semibold text-blue-600 hover:underline dark:text-primary-500">Create One !</Link>

                </p>

                <p className="text-sm font-semibold text-white dark:text-white">
                  For home page. <Link to="/" className="font-semibold text-blue-600 hover:underline dark:text-primary-500">Click Here</Link>
                  
                </p>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login