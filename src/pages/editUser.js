import React, { useState, useEffect, useRef } from 'react';
import './editUser.css';
import GreyDiv from '../components/GreyDiv.js';
import SimpleHeader from '../components/simpleHeader.js';
import InstrumentText from '../components/InstrumentText.js';
import { Link } from 'react-router-dom';


function EditUserForm({user, instruments}) {
    // const [inputs, setInputs] = useState({});
    const userEmail = user.email;
    const [userData, setUser] = useState({ email: userEmail });
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const handleChange = (event) => {
        setUser({
            ...userData,
            email: event.target.value
        });
    };

    function isValidEmail(email) {
        console.log(email);
        return /\S+@\S+\.\S+/.test(email);
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userData.email);
        if (!isValidEmail(userData.email)) {
            window.alert("Email non valide");
        } else {
            setError(null);
            console.log(userData.email)
        }      
    }

    const addInstrument = () => {
        setIsActive(current => !current);
        var instrumentsDiv = document.getElementById('instruments');

        for (var i = 0; i < instrumentsDiv.children.length; i++) {
            var instrument = instrumentsDiv.children[i];
            let instrumentName = instrument.children[0].innerHTML;
            instrument.addEventListener('click', function() {
                console.log(instrumentName);
            });
        }

        let close = document.getElementById('close');

        if (!close.hasEventListener) {
            close.addEventListener('click', function() {
                setIsActive(current => !current);
            });
            close.hasEventListener = true; 
        }
    };


    const removeInstrument = (event) => {
        // event.stopPropagation();
        // event.preventDefault();
        
        // let instrument = document.querySelector('#instrumentsList').querySelector(`[id="${index}"]`);
        // console.log(instrument, index);
        // instrument.remove();
        //     let removeBtn = document.getElementsByClassName('deleteBtn');

        // console.log(removeBtn, removeBtn[1]);
        // for(var i = 0; i < removeBtn.length; i++) {
        //     console.log(removeBtn[i]);
        //     removeBtn[i].addEventListener('click', function() {
        //         console.log(this.id);
        //     });
        // }

        event.stopPropagation();
        console.log('Button clicked!');

    }


    return (
        <div className="content">
            <div id="editUser">
                <div className='userPicName'>
                    <img className="userPic" src="../logo192.png" alt="profile"/>
                    <div className="userName">
                        <h2>{user.firstname}<br/> {user.lastname}</h2>
                    </div>
                </div>
                <GreyDiv content={
                    <div>
                        <form onSubmit={handleSubmit} id="editUserForm">
                            <div>Instruments :</div>
                            <div className='userInstruments'>
                                <div id="instrumentsList">
                                    {user.instruments.map((instrument, index) => {
                                        return (
                                        <div key={index} id={index}> 
                                            <InstrumentText key={index} text={instrument} />
                                            <button id={index} type="button" onClick={removeInstrument} className='deleteBtn'>x</button>
                                        </div>)
                                    })}
                                </div>
                                <button onClick={addInstrument}> + </button>
                            </div>
                          
                            <div id='overlay' style={{
                                    display: isActive ? 'block' : 'none',
                                    }}>
                                <div id='popup'>
                                    <div id='close'>&#10006;</div>
                                    <h2>Instruments</h2>
                                    <div id="instruments">
                                        {instruments.map((instrument, index) => {
                                            return <div key={index} id={index}>
                                                <InstrumentText key={index} text={instrument.name} />
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                          
                            <hr></hr>
                            <label>Adresse mail :
                            <input 
                                type="text" 
                                name="email" 
                                value={userData.email || ""}
                                onChange={handleChange}
                            />
                            </label>
                        </form>
                    </div>
                }/>
                <div className="userValidateBtn">
                    <input type="submit" form="editUserForm" value="Valider"/>
                </div>
            </div>
            
        </div>
    )
}


let user = {
    firstname: "John",
    lastname: "Doe",
    email: "adadas@mail.com",
    instruments: ["Piaeeeeno","Guitare"],
}

let instruments = [
    {name : "Piano"},
    {name : "Batterie"},
    {name : "aefaef"},
]

export default function EditUser(){
    return (
        <div>
            <SimpleHeader />
            <EditUserForm user={user} instruments={instruments} />
        </div>
    );
};