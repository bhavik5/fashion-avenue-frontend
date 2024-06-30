import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import './Content.css';
import Header from './Header';
import Footer from './Footer';

const baseurl = 'https://729df12d-1df7-4184-b21c-a187b10f67d4.e1-us-east-azure.choreoapps.dev';

export default function Content() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const customTitle = useParams();
    const [titleContent, setTitleContent] = useState("");

    const verifySession = () => {
        fetch(baseurl+'/verify_session/'+email, {
            method: 'GET',
        }).then((res) => res.json())
        .then((res) => {
            if(res === 0) {
                navigate('/');
            } else {
                getTitleContent();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        verifySession();
    }, []);

    const getTitleContent = () => {
        fetch(baseurl+'/get_titlecontent/'+customTitle.title, {
            method: 'GET',
        }).then((res) => res.json())
        .then((res) => {
            if(res[0]) {
                setTitleContent(res[0].titleContent);
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
                {parse(titleContent)}
            </div>
            <Footer />
        </div>
    )
}