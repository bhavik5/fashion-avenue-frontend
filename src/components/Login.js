import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';
import LoginFooter from './LoginFooter';
import './Login.css';

const baseurl = 'https://4ee10bc6-e793-40a2-9db4-0592c85da2c3.e1-us-east-azure.choreoapps.dev';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [userpwd, setuserpwd] = useState("");
    const [errMessage, setErrMessage] = useState("");

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const validateEmail = (email) => {
        if(email.match(isValidEmail)) {
            return true;
        } else {
            return false;
        }
    }

    const login = () => {
        if(email.trim() !== '' && userpwd.trim() !== '') {
            if(validateEmail(email.trim())) {
                fetch(baseurl+'/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email.trim(), userpwd: userpwd.trim() })
                }).then(async (res) => {
                    if(res.status === 200) {
                        let rs = await res.json();
                        if(rs.flag === 1) {
                            localStorage.setItem("email", email);
                            navigate('/dashboard');
                        } else if(rs.flag === 2) {
                            localStorage.setItem("email", email);
                            navigate('/controlroom');
                        } else {
                            setErrMessage("Invalid login");
                            setTimeout(() => {
                                setErrMessage("");
                            }, 2000);
                        }
                    } else {
                        if(res.status === 406) {
                            setErrMessage("Email not verified");
                            setTimeout(() => {
                                setErrMessage("");
                            }, 2000);
                        } else {
                            setErrMessage("Invalid credentials");
                            setTimeout(() => {
                                setErrMessage("");
                            }, 2000);
                        }
                    }
                }).catch((err) => {
                    setErrMessage("Unable to login");
                    setTimeout(() => {
                        setErrMessage("");
                    }, 2000);
                })
            } else {
                setErrMessage("Invalid email");
                setTimeout(() => {
                    setErrMessage("");
                }, 2000);
            }
        } else {
            setErrMessage("Please enter email and password");
            setTimeout(() => {
                setErrMessage("");
            }, 2000);
        }
    }
    
    return (
        <div>
            <Header/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4"></div>
                    <div className="col-sm-6 col-md-4 col-md-offset-4 customDiv">
                        <h1 className="text-center login-title">Signin to continue to fashion avenue</h1>
                        <div className="account-wall">
                            <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                                alt="" />
                            <form className="form-signin">
                                <input type="text" className="form-control marginTop" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" className="form-control marginTop" placeholder="Password" required value={userpwd} onChange={(e) => setuserpwd(e.target.value)} />
                                <center><div style={{ color: 'red' }}>{errMessage}</div></center>
                            </form>
                            <div className='customButtonDiv'>
                                <button className="btn btn-primary customButton1" type="" onClick={login}>Signin</button>&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className='customSpanDiv'>
                                <center><Link style={{ width: '30%' }} className="text-center new-account customSpan" to='/forgetpassword' >Forget Password?</Link></center>
                            </div>
                        </div>
                        <Link className="text-center new-account" to='/signup' >Create an account</Link>
                    </div>
                </div>
            </div>
            <LoginFooter />
        </div>
    )
}