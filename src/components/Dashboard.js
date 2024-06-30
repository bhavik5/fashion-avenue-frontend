import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Dashboard.css';
import Header from './Header';
import Footer from './Footer';

const baseurl = 'https://4ee10bc6-e793-40a2-9db4-0592c85da2c3.e1-us-east-azure.choreoapps.dev'

export default function Dashboard() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");

    useEffect(() => {
        verifySession();
    }, []);

    const verifySession = () => {
        fetch(baseurl+'/verify_session/'+email, {
            method: 'GET',
        }).then((res) => res.json())
        .then((res) => {
            if(res === 0) {
                navigate('/');
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div style={{ textAlign: 'center', fontSize: 20, color: 'grey', marginTop: '10%' }}>
                        Dashboard
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}