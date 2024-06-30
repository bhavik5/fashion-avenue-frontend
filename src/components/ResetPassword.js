import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import './Signup.css';
import Header from "./Header";
import LoginFooter from "./LoginFooter";

const baseurl = 'https://4ee10bc6-e793-40a2-9db4-0592c85da2c3.e1-us-east-azure.choreoapps.dev';

export default function ResetPassword() {
    const [userpwd, setuserpwd] = useState("");
    const [verifyuserpwd, setVerifyuserpwd] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const id = useParams();

    const changePassword = () => {
        if(userpwd.trim() !== '' && verifyuserpwd.trim() !== '') {
            if(userpwd.trim() === verifyuserpwd.trim()) {
                fetch(baseurl+'/change_password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: id.id.trim(), userpwd: userpwd.trim() })
                }).then((res) => {
                    if(res.ok) {
                        setSuccessMessage("Successfully changed.");
                        setuserpwd("");
                        setVerifyuserpwd("");
                        setTimeout(() => {
                            setSuccessMessage("");
                        }, 3000);
                    } else {
                        setErrMessage("Email Id not registered");
                        setTimeout(() => {
                            setErrMessage("");
                        }, 2000);
                    }
                }).catch((err) => {
                    setErrMessage("Unable to change");
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
                        <h1 className="text-center login-title">Reset Password</h1>
                        <div className="account-wall">
                            <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                                alt="" />
                            <form className="form-signin">
                                <input type="password" className="form-control marginTop" placeholder="Password" required value={userpwd} onChange={(e) => setuserpwd(e.target.value)} />
                                <input type="password" className="form-control marginTop" placeholder="Reenter Password" required value={verifyuserpwd} onChange={(e) => setVerifyuserpwd(e.target.value)} />
                                <center><div style={{ color: 'red' }}>{errMessage}</div></center>
                                <center><div style={{ color: 'green' }}>{successMessage}</div></center>
                            </form>
                            <div className='customButtonDiv'><button className="btn btn-primary customButton" type="" onClick={changePassword}>change password</button></div>
                        </div>
                        <Link className="text-center new-account" to='/' >Back to Signin</Link>
                    </div>
                </div>
            </div>
            <LoginFooter />
        </div>
    )
}