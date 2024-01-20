import React, { useState, useEffect, useRef } from 'react';
import './editUser.css';
import GreyDiv from '../components/GreyDiv.js';
import SimpleHeader from '../components/simpleHeader.js';
import InstrumentText from '../components/InstrumentText.js';
import { Link, useNavigate } from 'react-router-dom';
import CheckLogin from '../components/checkLogin.js';
import { getAPI, deleteAPI, putAPI } from '../components/fetchAPI.js';



function EditUserForm() {
    CheckLogin();
    const [user, setUser] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [allInstruments, setAllInstruments] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getAPI('user', setUser);
            await getAPI('user-instruments', setInstruments);
            await getAPI('instruments', setAllInstruments);
        };
        fetchData();

    }, []);

    // const [inputs, setInputs] = useState({});
    const userEmail = user.email;
    // const [userData, setUserData] = useState({ email: userEmail });
    // const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(false);


    // const handleChange = (event) => {
    //     setUserData({
    //         ...userData,
    //         email: event.target.value
    //     });
    // };

    // function isValidEmail(email) {
    //     console.log(email);
    //     return /\S+@\S+\.\S+/.test(email);
    // }
  
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(userData.email);
    //     if (!isValidEmail(userData.email)) {
    //         window.alert("Email non valide");
    //     } else {
    //         setError(null);
    //         console.log(userData.email)
    //     }      
    // }

    // const addInstrument = () => {
    //     setIsActive(current => !current);
    //     var instrumentsDiv = document.getElementById('instruments');

    //     for (var i = 0; i < instrumentsDiv.children.length; i++) {
    //         var instrument = instrumentsDiv.children[i];
    //         let instrumentName = instrument.children[0].innerHTML;
    //         instrument.addEventListener('click', function() {
    //             console.log(instrumentName);
    //         });
    //     }

    //     let close = document.getElementById('close');

    //     if (!close.hasEventListener) {
    //         close.addEventListener('click', function() {
    //             setIsActive(current => !current);
    //         });
    //         close.hasEventListener = true; 
    //     }
    // };


    function removeInstrument(e){
        let ide = e.target.parentElement.id;
        deleteAPI('user-instruments/'+ide);
        e.target.parentElement.style.display = 'none';
    }

    function selectInstrument(e){
        e.target.classList.toggle('selectedInstrument');
    }

    function popUp(){
        setIsActive(current => !current);
        let close = document.getElementById('close');
        getAPI('user-instruments', setInstruments);

        if (!close.hasEventListener) {
            close.addEventListener('click', function() {
                setIsActive(current => !current);
            });
            close.hasEventListener = true; 
        }
    }

    function addInstrument(){
        let instrumentsSelected = document.querySelectorAll('.selectedInstrument');
        let instrumentsId = [];
        for (const instrument of instrumentsSelected) {
            instrumentsId.push(instrument.parentElement.id);
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            body: JSON.stringify({"instrumentList":instrumentsId})
        };
        fetch('https://harmonize.mael-mouquet.fr/api/user-instruments', requestOptions)
        .then(response => response.json())
        .then(data => {
            setIsActive(current => !current);
            getAPI('user-instruments', setInstruments);
        });

    }

    function submitData(){
        let changedData = document.querySelectorAll('.changedData');

        // if (!isValidEmail(changedData[0].value)) {
        //     window.alert("Email non valide");
        //     return;
        // }
        
        let data={};
        changedData.forEach(element => {
            if(element.name == "gender"){
                if(element.value.toLowerCase() == "homme" || element.value.toLowerCase() == "men"){
                    data[element.name] = "male"
                }
                else if(element.value.toLowerCase() == "femme" || element.value.toLowerCase() == "woman"){
                    data[element.name] = "female"
                }
                else{
                    data[element.name] = element.value.toLowerCase()
                }
            }
            else{
                data[element.name] = element.value;
            }
        });
        console.log(data);
        putAPI('user/'+user.id, data);
        if (user.roles && user.roles.includes("ROLE_TEACHER")) {
            let changedDataTeacher = document.querySelector('.changedDataTeacher');
            putAPI('teachers/'+user.teachers[0].id, {city:changedDataTeacher.value});
        }
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
                        <div  id="editUserForm">
                            <p>Instruments</p>
                            <div className='userInstruments'>
                                <div id="instrumentsList">
                                    {instruments.map((instrument, index) => {
                                        return (
                                        <div key={index} id={instrument.id}> 
                                            <InstrumentText key={index} text={instrument.Instrument.Name} />
                                            <button id={index} type="button" onClick={removeInstrument} className='deleteBtn'>x</button>
                                        </div>)
                                    })}
                                </div>
                                {/* <button onClick={addInstrument}> + </button> */}
                                <button onClick={popUp}> + </button>
                            </div>
                          
                            <div id='overlay' style={{
                                    display: isActive ? 'block' : 'none',
                                    }}>
                                <div id='popup'>
                                    <div id='close'>&#10006;</div>
                                    <h2>Instruments</h2>
                                    <div id="instruments">
                                        {allInstruments.map((globalInstrument) => {
                                            if (!instruments.some((instrument) => instrument.Instrument.Name === globalInstrument.Name)) {
                                                return (
                                                <div key={globalInstrument.id} id={globalInstrument.id} onClick={selectInstrument}>
                                                    <InstrumentText text={globalInstrument.Name} />
                                                </div>
                                                );
                                            }
                                            return null; 
                                        })}
                                    </div>
                                    <button className='addInstrument' onClick={addInstrument}>Ajouter</button>
                                </div>
                            </div>
                          
                            <hr></hr>
                            {user.roles && user.roles.includes("ROLE_TEACHER") ? (
                            <>
                                <label>Ville</label>
                                <input
                                    type='text'
                                    className="userDesc changedDataTeacher"
                                    name='city'
                                    defaultValue={user.teachers[0] ? user.teachers[0].city : "Ville non spécifiée..."}
                                />
                                <hr />
                            </>
                            ) : null}

                            <label>Description</label>
                            <textarea name="description"className="userDesc changedData" rows="5" defaultValue={user.description}></textarea>

                            <hr></hr>
                            <label>Genre</label>
                            <input name="gender"className="userDesc changedData" defaultValue={user.gender == "male" ?"Homme":user.gender == "female" ?"Femme":user.gender}/>
                        </div>
                    </div>
                }/>
                <div className="userValidateBtn">
                    <input type="submit" value="Valider" onClick={submitData}/>
                </div>
            </div>
            
        </div>
    )
}


export default function EditUser(){
    CheckLogin();
    return (
        <div>
            <SimpleHeader />
            <EditUserForm />
        </div>
    );
};