import React, { useContext, useEffect, useState } from "react";
import NewCard from "../NavbarComponet/NewCard";
import SideBarComponent from "../SideBarComponent/SideBarComponent";
import Universal_Navbar from "../Universal_Navbar";
import SecondNav from "../NavbarComponet/SecondNav";
import GoToTop from "../GoToTop";
import Alert from "../Alert";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import showToast from "../../Utils/showToast";
import { getUserProfile, setUserAuthState, userGroups } from "../../Redux/authentication/authSlice";
import NavbarCoponent from "../NavbarComponet/NavbarCoponent";

export default function RenderingFirst() {

  const [alert, setAlert] = useState(null);
  const { homePage, setHomePage } = useContext(AuthContext);
  const { redirectLogin, setRedirectLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirectLogin({ isTrue: true, msg: "Please Logged In First" });
      Navigate("/login");
    }

    else if (homePage.isTrue) {
      showToast({
        msg: homePage.msg,
        type: "success",
        duration: 3000
      })
      setHomePage({ isTrue: false, msg: "" });
    }
    dispatch(getUserProfile());
    setLoading(true);
    dispatch(userGroups());
    setLoading(false);
  }, []);

  if (auth.data) {
    return (
      <div>
        < NavbarCoponent />
        <div>
          <SideBarComponent />
        </div>
        {alert && <Alert alert={alert} />}
        <div className={`min-[768px]:ml-[90px] mt-[60px] grid-cols-1 `}>
          <div>
            <SecondNav />
          </div>
          {!loading ?
            auth.user_groups ? auth.user_groups.length != 0 ? <div className="md:my-[27px] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  px-3 mb-16">
              {auth.user_groups.map((grp) => (
                <NewCard key={grp._id} grp_id={grp._id} grpName={grp.name} />
              ))}</div> : <>
              <div className="max-[746px]:text-center font-mono text-3xl ml-4">No Grp Found</div>
              <div className="max-[746px]:text-center font-mono text-3xl ml-4">You can join new groups or create new one.</div>
            </> :
              <button disabled type="button" class=" w-full  text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center justify-center">
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                <div className='text-center text-black text-2xl'>Loading...</div>
              </button> : <div className="animate-pulse md:my-[27px] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  px-3">
              <NewCard key={1} grp_id={2} grpName={""} />
              <NewCard key={2} grp_id={2} grpName={""} />
              <NewCard key={3} grp_id={2} grpName={""} />
              <NewCard key={4} grp_id={2} grpName={""} />
              <NewCard key={5} grp_id={2} grpName={""} />
            </div>}

        </div>

        <GoToTop />
      </div>
    );
  }
}
