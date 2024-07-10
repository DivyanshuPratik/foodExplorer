import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Login.css';
import axios from "axios";
import { StoreContext } from '../../context/storeContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setShowLogin }) => {
    const { token, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (currState === "Sign Up") {
                const response = await axios.post("http://localhost:3000/api/user/register", data);
                setCurrState("Login");
                setData({ name: "", email: "", password: "" });
                toast.success("Account created successfully");
            } else {
                const response = await axios.post("http://localhost:3000/api/user/login", data);
                setToken(response.data.token);
                localStorage.setItem("token",response.data.token)
                setShowLogin(false);
                toast.success("Logged In Successfully");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    }

    return (
        <>
           
            <div className='overlay' onClick={() => setShowLogin(false)}></div>
            <div className='Login-popup'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <h1>{currState}</h1>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />

                    <div className="login-popup-inputs">
                        {currState === "Sign Up" && (
                            <input
                                type="text"
                                placeholder='Your name'
                                required
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                            />
                        )}
                        <input
                            type="email"
                            placeholder='Your email'
                            required
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder='Your Password'
                            required
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                    </div>
                    <button type='submit' className="login-button">{currState === "Sign Up" ? "Create Account" : "Login"}</button>

                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    {currState === "Login" ? (
                        <p>Create a new account<span onClick={() => { setCurrState("Sign Up"); setData({ name: "", email: "", password: "" }) }}> Click Here</span></p>
                    ) : (
                        <p>Already have an account?<span onClick={() => { setCurrState("Login"); setData({ name: "", email: "", password: "" }) }}> Login Here</span></p>
                    )}
                </form>
            </div>
        </>
    );
};

export default Login;
