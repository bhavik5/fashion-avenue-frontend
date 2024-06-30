import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Footer.css';

const baseurl = 'http://localhost:5005';

export default function Footer() {
    const navigate = useNavigate();
    const [customTitleList, setCustomTitleList] = useState([]);
    // const [email, setEmail] = useState("test@mail.com");

    useEffect(() => {
        getTitles();
    }, []);
    
    const getTitles = () => {
        fetch(baseurl+'/get_titles', {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((res) => setCustomTitleList(res));
    }

    function refreshPage() {
        setTimeout(() => {
            window.location.reload(false);
        }, 500);
    }

    const signout = () => {
        const email = localStorage.getItem("email");
        fetch(baseurl+'/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email.trim() })
        }).then(async (res) => {
            navigate('/');
        }).catch((err) => {
            console.log(err);
        })
    }

    return (<div className="footer">
        <div style={{ fontSize: 15, fontWeight: '500', color: 'grey' }}>FashionAvenue.com, Inc.</div>
        <div>
            <Link key={1001} style={{ textDecoration: 'none' }} to={`/dashboard`}><span style={{ color: 'grey', cursor: 'pointer' }}>&nbsp;Dashboard | </span></Link>
            <Link key={1002} style={{ textDecoration: 'none' }} to={`/titleandhandle`}><span style={{ color: 'grey', cursor: 'pointer' }}> Profile | </span></Link>
            {customTitleList.map((item,i) => 
                <Link key={i} style={{ textDecoration: 'none' }} to={`/content/${item.customTitle}`} onClick={refreshPage}><span style={{ color: 'grey', cursor: 'pointer' }}>{item.customTitle} | </span></Link>
            )}
            <Link key={1003} style={{ textDecoration: 'none', }} onClick={signout}><span style={{ color: 'red', cursor: 'pointer', fontWeight: 'bold' }}>Signout</span></Link>
        </div>
        <div style={{ fontSize: 12, color: 'grey', }}>Copyright © 2000-2024 All rights reserved. FashionAvenue.com is a registered trademark of FashionAvenue.com, Inc. All other trademarks are property of their respective owners.</div>
    </div>)
}