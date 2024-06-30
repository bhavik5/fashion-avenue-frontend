import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Signup.css';
import Header from "./Header";
import LoginFooter from "./LoginFooter";

const baseurl = 'https://4ee10bc6-e793-40a2-9db4-0592c85da2c3.e1-us-east-azure.choreoapps.dev';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [userpwd, setuserpwd] = useState("");
    const [verifyuserpwd, setVerifyuserpwd] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const validateEmail = (email) => {
        if(email.match(isValidEmail)) {
            return true;
        } else {
            return false;
        }
    }

    const saveUser = () => {
        if(email.trim() !== '' && userpwd.trim() !== '' && verifyuserpwd.trim() !== '') {
            if(validateEmail(email.trim())) {
                if(userpwd.trim() === verifyuserpwd.trim()) {
                    fetch(baseurl+'/create_user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: email.trim(), userpwd: userpwd.trim() })
                    }).then((res) => {
                        if(res.ok) {
                            setSuccessMessage("Successfully created. Please check your email.");
                            setEmail("");
                            setuserpwd("");
                            setVerifyuserpwd("");
                            setTimeout(() => {
                                setSuccessMessage("");
                            }, 3000);
                        } else {
                            setErrMessage("Email already exists");
                            setTimeout(() => {
                                setErrMessage("");
                            }, 2000);
                        }
                    }).catch((err) => {
                        setErrMessage("Unable to create");
                        setTimeout(() => {
                            setErrMessage("");
                        }, 2000);
                    })
                } else {
                    setErrMessage("Password not matched");
                    setTimeout(() => {
                        setErrMessage("");
                    }, 2000);
                }
            } else {
                setErrMessage("Invalid email");
                setTimeout(() => {
                    setErrMessage("");
                }, 2000);
            }
        } else {
            setErrMessage("All fields are mandatory");
            setTimeout(() => {
                setErrMessage("");
            }, 2000);
        }
    }

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4"></div>
                    <div className="col-sm-6 col-md-4 col-md-offset-4 customDiv">
                        <h1 className="text-center login-title">Signup to fashion avenue</h1>
                        <div className="account-wall">
                            <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                                alt="" />
                            <form className="form-signin">
                                <input type="text" className="form-control" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" className="form-control marginTop" placeholder="Password" required value={userpwd} onChange={(e) => setuserpwd(e.target.value)} />
                                <input type="password" className="form-control marginTop" placeholder="Reenter Password" required value={verifyuserpwd} onChange={(e) => setVerifyuserpwd(e.target.value)} />
                                <center><div style={{ color: 'red' }}>{errMessage}</div></center>
                                <center><div style={{ color: 'green' }}>{successMessage}</div></center>
                            </form>
                            <div className='customButtonDiv'><button className="btn btn-primary customButton" type="" onClick={saveUser}>Signup</button></div>
                        </div>
                        <Link className="text-center new-account" to='/' >Already have account? Signin</Link>
                    </div>
                </div>
            </div>
            <LoginFooter />
        </div>
    )
}