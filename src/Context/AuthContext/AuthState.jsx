import AuthContext from "./AuthContext";
import { useState } from "react";


const AuthState = (props) => {

    // const url = process.env.REACT_APP_BASE_URL;
    const url = process.env.REACT_APP_BASE_DEV_URL;

    const key = "PLACEMENT-PROJECT";

    const [redirectLogin, setRedirectLogin] = useState({ isTrue: false, msg: "" });
    const [redirectOTP, setRedirectOTP] = useState({ isTrue: false, msg: "" });
    const [homePage, setHomePage] = useState({ isTrue: false, msg: "" });

    const registerUser = async (firstName, lastName, email) => {
        const response = await fetch(`${url}/account/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key
            },
            body: JSON.stringify({ firstName, lastName, email })
        });
        const json = await response.json();
        return json;
        // return(json);
    }

    const createPassword = async (password, token) => {
        const response = await fetch(`${url}/account/accept/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key
            },
            body: JSON.stringify({ password })
        });
        const json = await response.json();
        // console.log(json);
        return json;
    }

    const sendingdOTP = async (email, password) => {
        const response = await fetch(`${url}/account/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        // console.log(json);
        return json;
    }

    const checkOTP = async (otp) => {
        const response = await fetch(`${url}/account/checkotp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key,
                'auth-token': localStorage.getItem('otp-token')
            },
            body: JSON.stringify({ otp })
        });
        const json = await response.json();
        // console.log(json);
        return json;
    }

    const sendResetEmail = async (email) => {
        const response = await fetch(`${url}/account/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key
            },
            body: JSON.stringify({ email })
        });
        const json = await response.json();
        // console.log(json);
        return json;
    }

    const resetPassword = async (password, token) => {
        const response = await fetch(`${url}/account/reset/${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'security-key': key
            },
            body: JSON.stringify({ password })
        });
        const json = await response.json();
        // console.log(json);
        return json;
    }

    return (
        <AuthContext.Provider value={{ registerUser, createPassword, redirectLogin, setRedirectLogin, sendingdOTP, redirectOTP, setRedirectOTP, checkOTP, homePage, setHomePage, sendResetEmail, resetPassword}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;