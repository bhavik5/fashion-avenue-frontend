import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import './TitleAndHandle.css';

const baseurl = 'https://729df12d-1df7-4184-b21c-a187b10f67d4.e1-us-east-azure.choreoapps.dev';

export default function TitleAndHandle() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const [customTitle, setCustomTitle] = useState("");
    const [customHandle, setCustomHandle] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const verifySession = () => {
        fetch(baseurl+'/verify_session/'+email, {
            method: 'GET',
        }).then((res) => res.json())
        .then((res) => {
            if(res === 0) {
                navigate('/');
            } else {
                getProfile();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        verifySession();
    }, []);

    const getProfile = () => {
        fetch(baseurl+'/get_profile', {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.length > 0) {
                setCustomTitle(res[0].customTitle);
                setCustomHandle(res[0].customHandle);
            }
        });
    }

    const saveProfile = () => {
        if(customTitle.trim() !== '' && customHandle.trim() !== '') {
            fetch(baseurl+'/save_profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ customTitle: customTitle.trim(), customHandle: customHandle.trim() })
            }).then(async (res) => {
                if(res.ok) {
                    setSuccessMessage("Successfully saved");
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 2000);
                } else {
                    setErrMessage("Unable to save");
                    setTimeout(() => {
                        setErrMessage("");
                    }, 2000);
                }
            }).catch((err) => {
                console.log(err);
                setErrMessage("Unable to save");
                setTimeout(() => {
                    setErrMessage("");
                }, 2000);
            })
        } else {
            setErrMessage("All fields are required");
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
                            <h1 className="text-center login-title">Title & Handle</h1>
                            <form className="form-signin">
                                <input type="text" className="form-control marginTop" placeholder="Title" value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} />
                                <input type="text" className="form-control marginTop" placeholder="Handle" value={customHandle} onChange={(e) => setCustomHandle(e.target.value)} />
                                <center><div style={{ color: 'red' }}>{errMessage}</div></center>
                                <center><div style={{ color: 'green' }}>{successMessage}</div></center>
                            </form>
                            <center><button className="btn btn-primary customButton" type="" onClick={saveProfile}>Save</button></center>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}