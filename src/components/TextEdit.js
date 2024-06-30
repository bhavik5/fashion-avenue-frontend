import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import JoditEditor from 'jodit-react';

import './TextEdit.css';
import Header from './Header';
import Footer from './Footer';

const baseurl = 'https://4ee10bc6-e793-40a2-9db4-0592c85da2c3.e1-us-east-azure.choreoapps.dev'

export default function TextEdit() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const customTitle = useParams();
    const [titleContent, setTitleContent] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const editor = useRef (null);
    const [content, setContent] = useState("");


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
                setContent(res[0].titleContent);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const saveTitleContent = () => {
        if(content.trim() !== '') {
            fetch(baseurl+'/save_title_content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({customTitle: customTitle.title.trim(), titleContent: content})
            }).then((res) => {
                if(res.ok) {
                    setSuccessMessage("Successfully saved");
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 2000);
                } else {
                    setErrMessage("Unable to save the content");
                    setTimeout(() => {
                        setErrMessage("");
                    }, 2000);
                }
            }).catch((err) => {
                console.log(err);
                setErrMessage("Unable to save the content");
                setTimeout(() => {
                    setErrMessage("");
                }, 2000);
            })
        } else {
            setErrMessage("Title content required");
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
                    <div className="col-sm-6 col-md-2 col-md-offset-3"></div>
                    <div className="col-sm-6 col-md-8 col-md-offset-3 customDiv">
                        <h1 className="text-center login-title">{customTitle.title}</h1>

                        <JoditEditor height="500px" config={{
                            safeMode: false,
                            showXPathInStatusbar: false,
                            showCharsCounter: false,
                            showwordsCounter: false,
                            toolbarAdaptive: false,
                            removeButtons: ['about'],
                            statusbar: false,
                            addNewLine: false,
                        }} ref={editor} value={content} tabindex={1} onBlur={(newContent) => { setContent(newContent) }} />

                        {/* <textarea className="form-control" id="exampleFormControlTextarea1" rows="15" placeholder="Text input goes here..." value={titleContent} onChange={(e) => setTitleContent(e.target.value)} /> */}
                        <center><div style={{ color: 'red' }}>{errMessage}</div></center>
                        <center><div style={{ color: 'green' }}>{successMessage}</div></center>
                        <center style={{ marginBottom: 100 }}>
                            <Link className="btn btn-secondary text-light customButton" to='/controlroom'>Back</Link>&nbsp;&nbsp;&nbsp;
                            <button className="btn btn-primary customButton" type="" onClick={saveTitleContent}>Save</button>
                        </center>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}