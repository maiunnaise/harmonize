import React, { useState, useEffect } from 'react';
import './User.css';
import GreyDiv from '../components/GreyDiv.js';
import SimpleHeader from '../components/simpleHeader.js';
import InstrumentText from '../components/InstrumentText.js';
import { Link } from 'react-router-dom';
import CheckLogin from '../components/checkLogin.js';

function UserInfo({user}){
    CheckLogin();
    return (
        <div className="content simpleContent">
            <SimpleHeader />
            <div className='userPicName'>
                <img src="../logo192.png" alt="profile"/>
                <div>
                    <h2>{user.firstname}<br/> {user.lastname}</h2>
                </div>
            </div>
            <GreyDiv content={
                <div className="userDetails">
                    <h2>Instruments</h2>
                    <div className='userInstruments'>
                        {user.instruments.map((instrument, index) => {
                            return <InstrumentText key={index} index={index} text={instrument}/>;
                        })}
                    </div>
                    <hr></hr>
                    <h2>Adresse mail</h2>
                    <div className="userEmail">{user.email}</div>
                </div>
            }/>
            <div className="userModifBtn">
                <Link to="./edit">
                    <button>Modifier informations</button>
                </Link>
            </div>
        </div>
    )
}

let user = {
    firstname: "John",
    lastname: "Doe",
    email: "adadasdad",
    instruments: ["Piano","Guitare"],
}

export default function User(){
    return (
        <UserInfo user={user} />
    );
};