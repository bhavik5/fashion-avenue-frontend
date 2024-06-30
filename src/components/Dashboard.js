import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Dashboard.css';
import Header from './Header';
import Footer from './Footer';

const baseurl = 'http://localhost:5005'

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