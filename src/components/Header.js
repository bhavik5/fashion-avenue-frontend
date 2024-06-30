import React from "react";
import './Header.css';

export default function Header() {
    return (<div className="header">
        <div>
            <img src={require('./logo.png')} height="50" />
        </div>
    </div>)
}