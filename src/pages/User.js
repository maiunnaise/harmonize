import React, { useState, useEffect } from 'react';
import './User.css';
import GreyDiv from '../components/GreyDiv.js';
import SimpleHeader from '../components/simpleHeader.js';
import InstrumentText from '../components/InstrumentText.js';
import { Link } from 'react-router-dom';
import CheckLogin from '../components/checkLogin.js';
import { getAPI } from '../components/fetchAPI.js';

function UserInfo(){
    CheckLogin();
    const [user, setUser] = useState([]);
    const [instruments, setInstruments] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getAPI('user', setUser);
            await getAPI('user-instruments', setInstruments);
        };
        fetchData();

    }, []);
    
    
    console.log(user, instruments);

    function logout(){
        localStorage.removeItem("token");
    }
    return (
        <div className="simpleContent">
            <SimpleHeader />
            <div className='userPicName'>
                <img src="../logo192.png" alt="profile"/>
                <div>
                    <h2>{user.prenom}<br/> {user.nom}</h2>
                </div>
            </div>
            <GreyDiv content={
                <div className="userDetails">
                    <h2>Instruments</h2>
                    <div className='userInstruments'>
                        {instruments.map((instrument, index) => {
                            return <InstrumentText key={index} index={index} text={instrument.Instrument.Name}/>;
                        })}
                    </div>
                    <hr></hr>
                    <h2>Adresse mail</h2>
                    <div className="userEmail">{user.email}</div>
                    <hr></hr>
                    <h2>Description</h2>
                    <div className="userDesc">{user.description}</div>
                    <hr></hr>
                    <h2>Genre</h2>
                    <div className="userDesc">{user.gender == "male" ?"Homme":"Femme"}</div>
                </div>
            }/>
            <div className="userModifBtn">
                <Link to="./edit">
                    <button>Modifier informations</button>
                </Link>
                <Link to="/login">
                <button className='logout' onClick={logout}>Déconnexion</button>
                </Link>
            </div>
        </div>
    )
}

// let user = {
//     firstname: "John",
//     lastname: "Doe",
//     email: "adadasdad",
//     instruments: ["Piano","Guitare"],
// }

export default function User(){
    
    return <UserInfo  />
};