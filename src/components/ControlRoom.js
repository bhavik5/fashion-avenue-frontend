import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import './ControlRoom.css';
import Header from './Header';
import Footer from './Footer';

const baseurl = 'https://729df12d-1df7-4184-b21c-a187b10f67d4.e1-us-east-azure.choreoapps.dev';

export default function ControlRoom() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const [customTitle, setCustomTitle] = useState("");
    const [customTitleList, setCustomTitleList] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [refresh, setRefresh] = useState(false);

    const verifySession = () => {
        fetch(baseurl+'/verify_session/'+email, {
            method: 'GET',
        }).then((res) => res.json())
        .then((res) => {
            if(res === 0) {
                navigate('/');
            } else {
                getTitles();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        verifySession();
    }, []);

    const getTitles = () => {
        fetch(baseurl+'/get_titles', {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((res) => setCustomTitleList(res));
    }

    const saveTitle = () => {
        if(customTitle.trim() !== '') {
            if(customTitle.trim().includes("/") === false && customTitle.trim().includes("#") === false) {
                fetch(baseurl+'/save_title', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({customTitle: customTitle.trim()})
                }).then(async (res) => {
                    if(res.ok) {
                        setSuccessMessage("Successfully created");
                        setCustomTitle("");
                        getTitles();
                        setTimeout(() => {
                            setSuccessMessage("");
                        }, 2000);
                        refreshFooter();
                    } else {
                        if(res.status === 422) {
                            setErrMessage("Title already exist");
                            setTimeout(() => {
                                setErrMessage("");
                            }, 2000);
                        } else {
                            setErrMessage("Unable to create");
                            setTimeout(() => {
                                setErrMessage("");
                            }, 2000);
                        }
                    }
                }).catch((err) => {
                    setErrMessage("Unable to create");
                    setTimeout(() => {
                        setErrMessage("");
                    }, 2000);
                })
            } else {
                setErrMessage("# or / not allowed");
                setTimeout(() => {
                    setErrMessage("");
                }, 2000);
            }
        } else {
            setErrMessage("Title required");
            setTimeout(() => {
                setErrMessage("");
            }, 2000);
        }
    }

    const deleteTitle = (id) => {
        const result = window.confirm("Are you sure you want to delete this title? It will delete the content too.");
        if (result === true) {
            fetch(baseurl+'/delete_title/'+id, {
                method: 'DELETE',
            }).then((res) => {
                if(res.ok) {
                    setSuccessMessage("Deleted successfully");
                    getTitles();
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 2000);
                    refreshFooter();
                } else {
                    setErrMessage("Unable to delete");
                    setTimeout(() => {
                        setErrMessage("");
                    }, 2000);
                }
            }).catch((err) => {
                setErrMessage("Unable to delete");
                setTimeout(() => {
                    setErrMessage("");
                }, 2000);
            })
        }
    }

    const refreshFooter = () => {
        setRefresh(prevRefresh => !prevRefresh);
    };

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4"></div>
                    <div className="col-sm-6 col-md-4 col-md-offset-4 customDiv">
                        <h1 className="text-center login-title">Admin Control Room</h1>
                        <form className="form-signin">
                            <input type="text" className="form-control marginTop" placeholder="Title" value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} />
                            <center><div style={{ color: 'red' }}>{errMessage}</div></center>
                            <center><div style={{ color: 'green' }}>{successMessage}</div></center>
                        </form>
                        <div className='customButtonDiv'><button className="btn btn-primary customButton" type="" onClick={saveTitle}>Save</button></div>
                    </div>
                </div>

                <div className='row'>
                    <div className="col-sm-6 col-md-3 col-md-offset-4"></div>
                    <div className="col-sm-6 col-md-6 col-md-offset-4 divPadding">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col"><center>#</center></th>
                                    <th scope="col"><center>Title</center></th>
                                    <th scope="col"><center>Action</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customTitleList.map((item, index) => 
                                    <tr key={index}>
                                        <th scope="row"><center>{index+1}</center></th>
                                        <td>{item.customTitle}</td>
                                        <td><center><Link className="btn btn-warning btn-sm text-light" to={`/textedit/${item.customTitle}`}>Edit</Link>&nbsp;&nbsp;
                                        <button className="btn btn-danger btn-sm" type="" onClick={() => deleteTitle(item._id)}>Delete</button></center></td>
                                    </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer key={refresh.toString()} />
        </div>
    )
}
