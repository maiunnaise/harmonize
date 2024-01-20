import React, { useState, useEffect, useRef } from 'react';
import './editUser.css';
import GreyDiv from '../components/GreyDiv.js';
import SimpleHeader from '../components/simpleHeader.js';
import InstrumentText from '../components/InstrumentText.js';
import { Link } from 'react-router-dom';
import CheckLogin from '../components/checkLogin.js';
import { getAPI } from '../components/fetchAPI.js';



function EditUserForm() {
    CheckLogin();
    const [user, setUser] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [teacher, setTeacher] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getAPI('user', setUser);
            await getAPI('user-instruments', setInstruments);
        };
        fetchData();

    }, []);

    // const [inputs, setInputs] = useState({});
    const userEmail = user.email;
    const [userData, setUserData] = useState({ email: userEmail });
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const handleChange = (event) => {
        setUserData({
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


    const removeInstrument = (event, name) => {
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
        console.log('Button clicked with name:', name);

    }


    return (
        <div className="simpleContent">
            <div id="editUser">
                <div className='userPicName'>
                    <img className="userPic" src="../logo192.png" alt="profile"/>
                    <div className="userName">
                        <h2>{user.prenom}<br/> {user.nom}</h2>
                    </div>
                </div>
                <GreyDiv content={
                    <div>
                        <form onSubmit={handleSubmit} id="editUserForm">
                            <p>Instruments</p>
                            <div className='userInstruments'>
                                <div id="instrumentsList">
                                    {instruments.map((instrument, index) => {
                                        return (
                                        <div key={index} id={index}> 
                                            <InstrumentText key={index} text={instrument.Instrument.Name} />
                                            <button id={index} type="button" onClick={(event) => removeInstrument(event, instrument)} className='deleteBtn'>x</button>
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
                                    {/* <div id="instruments">
                                        {instruments.map((instrument, index) => {
                                            return <div key={index} id={index} >
                                                <InstrumentText key={index} text={instrument.name} />
                                            </div>
                                        })}
                                    </div> */}
                                </div>
                            </div>
                          
                            <hr></hr>
                            <label>Adresse mail
                            <input 
                                type="text" 
                                name="email" 
                                defaultValue={user.email}
                                onChange={handleChange}
                            />
                            </label>
                            <hr></hr>
                            {user.roles && user.roles.includes("ROLE_TEACHER") ? (
                            <>
                                <label>Ville</label>
                                <input
                                    type='text'
                                    className="userDesc"
                                    defaultValue={user.teachers[0] ? user.teachers[0].city : "Ville non spécifiée..."}
                                />
                                <hr />
                            </>
                            ) : null}

                            <label>Description</label>
                            <textarea className="userDesc" rows="5" defaultValue={user.description}></textarea>

                            <hr></hr>
                            <label>Genre</label>
                            <input className="userDesc" defaultValue={user.gender == "male" ?"Homme":user.gender == "female" ?"Femme":user.gender}/>
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
    CheckLogin();
    return (
        <div>
            <SimpleHeader />
            <EditUserForm />
        </div>
    );
};