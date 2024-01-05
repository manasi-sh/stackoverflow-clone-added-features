import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MobileDetect from 'mobile-detect';

import './Auth.css'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { signup,login } from '../../actions/auth'

const Auth = () => {

    const [isSignup, setIsSignup] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ip, setIp] = useState('');

    const userBrowser = navigator.userAgent;
    const userOs = navigator.userAgentData.platform;
    // const userDevice = navigator.userAgent.isMobile ? 'Mobile' : navigator.userAgent.isTablet ? 'Tablet' : 'Desktop';
    const md = new MobileDetect(window.navigator.userAgent);
    const userDevice = md.mobile() ? 'Mobile' : md.tablet() ? 'Tablet' : 'Desktop';

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSwitch = () => {
        setIsSignup(!isSignup);
      };

      useEffect(() => {
        const fetchIp = async () => {
          try {
            const response = await fetch('https://api64.ipify.org?format=json');
            const data = await response.json();
            setIp(data.ip);
          } catch (error) {
            console.error('Error fetching IP:', error);
          }
        };
    
        fetchIp(); // Call the asynchronous function when the component mounts
      }, []);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!email && !password) {
          alert("Enter email and password");
        }
        if (isSignup) {
          if (!name) {
            alert("Enter a name to continue");
          }
          dispatch(signup({ name, email, password, ip, userBrowser, userOs, userDevice}, navigate));
        } else {
          dispatch(login({ email, password, ip, userBrowser, userOs, userDevice }, navigate));
        }
      }

  return (
    <section className='auth-section'>
        {isSignup && <AboutAuth/>}
        <div className='auth-container-2'>
            {!isSignup && <img src={icon} alt='stack overflow' className='login-logo'/>}
            <form onSubmit={handleSubmit}>

                {
                    isSignup && (
                        <label htmlFor='name'>
                            <h4>Display Name</h4>
                            <input type='text' name='name' id='name' onChange={(e)=>{setName(e.target.value)}}/>
                        </label>
                    )
                }

                <label htmlFor='email'>
                    <h4>Email</h4>
                    <input type='email' name='email' id='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                </label>
                <label htmlFor='password'>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                    <h4>Password</h4>
                    {!isSignup && <p style={{color: "#007ac6", fontSize: "13px"}}>forgot password?</p>}
                    </div>
                    <input type='password' name='password' id='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    {isSignup && <p style={{color: "#666767", fontSize: "13px"}}>Password must contain atleast eight <br/>characters, including atleast 1 letter and 1 <br/>number.</p>}
                    {
                        isSignup && (
                            <label htmlFor='check'>
                                <input type='checkbox' id='check'/>
                                <p style={{fontSize: "13px", marginLeft:"20px"}}>Opt-in to receive occasional <br/>product updates, user research invitations,<br/> company announcements, and digests.</p>
                            </label>
                        )
                    }
                </label>
                <button type='submit' className='auth-btn'>{isSignup ? 'Sign up' : 'Log in'}</button>
                {
                    isSignup && (
                        <p style={{color: "#666767", fontSize: "13px"}}>By clicking "Sign up", you agree to our 
                        <span style={{color: "#007ac6"}}>terms of <br/>service</span>, 
                        <span style={{color: "#007ac6"}}>privacy policy</span>, and 
                        <span style={{color: "#007ac6"}}>cookie policy</span>. </p>
                    )
                }
            </form>
            <p>
                {isSignup?'Already have an account?' : "Don't have an account?"}
                <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup?'Log in':'Sign up'}</button>
            </p>
        </div>
    </section>
  )
}

export default Auth