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

export default function RenderingFirst() {

  const [alert, setAlert] = useState(null);
  const { homePage, setHomePage } = useContext(AuthContext);
  const { redirectLogin, setRedirectLogin } = useContext(AuthContext);
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
    dispatch(userGroups());
  }, []);

  if (auth.data) {
    return (
      <div>
        <Universal_Navbar />
        <div>
          <SideBarComponent />
        </div>
        {alert && <Alert alert={alert} />}
        <div className="ml-[90px] sm:ml-[100px] mt-[60px] grid-cols-1 ">
          <div>
            <SecondNav />
          </div>
          <div className=" md:my-[27px] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  px-3">

            {auth.user_groups.map((grp) => (
              <NewCard key={grp._id} grp_id ={grp._id} grpName={grp.name}/>
            ))}
          </div>
        </div>

        <GoToTop />
      </div>
    );
  }
}
