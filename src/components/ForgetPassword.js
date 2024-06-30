import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Signup.css';
import Header from "./Header";
import LoginFooter from "./LoginFooter";

const baseurl = 'https://729df12d-1df7-4184-b21c-a187b10f67d4.e1-us-east-azure.choreoapps.dev';

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
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

    const changePassword = () => {
        if(email.trim() !== '') {
            if(validateEmail(email.trim())) {
                fetch(baseurl+'/send_email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email.trim() })
                }).then((res) => {
                    if(res.ok) {
                        setSuccessMessage("Please check your email to reset password.");
                        setEmail("");
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
                setErrMessage("Invalid email");
                setTimeout(() => {
                    setErrMessage("");
                }, 2000);
            }
        } else {
            setErrMessage("Email Id mandatory");
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
                        <h1 className="text-center login-title">Forget Password</h1>
                        <div className="account-wall">
                            <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                                alt="" />
                            <form className="form-signin">
                                <input type="text" className="form-control" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <center><div style={{ color: 'red' }}>{errMessage}</div></center>
                                <center><div style={{ color: 'green' }}>{successMessage}</div></center>
                            </form>
                            <div className='customButtonDiv'><button className="btn btn-primary customButton" type="" onClick={changePassword}>Reset password</button></div>
                        </div>
                        <Link className="text-center new-account" to='/' >Back to Signin</Link>
                    </div>
                </div>
            </div>
            <LoginFooter />
        </div>
    )
}