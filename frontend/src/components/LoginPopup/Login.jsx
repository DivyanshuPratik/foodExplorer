import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './Login.css';

const Login = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign Up");

    return (
        <div className='Login-popup'>
            <form className='login-form'>
                <h1>{currState}</h1>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </form>
            <div className="login-popup-inputs">
                {currState === "Sign Up" ? <input type="text" placeholder='Your name' required /> : null}
                <input type="text" placeholder='Your email' required />
                <input type="text" placeholder='Your Password' required />
            </div>
            <button className="login-button">{currState === "Sign Up" ? "Create Account" : "Login"}</button>

            <p>By continuing, I agree to the terms of use & privacy policy.</p>
            {currState === "Login" ?
                <p>Create a new account?<span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
                :
                <p>Already have an account?<span onClick={() => setCurrState("Login")}>Login Here</span></p>
            }
        </div>
    );
};

export default Login;
