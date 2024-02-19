import React, { useState, useEffect } from 'react';
import './findTeacher.css';
import GreyDiv from '../components/GreyDiv.js';
import { getAPI, postAPI } from '../components/fetchAPI.js';
import manageCache from '../components/cache';

function TeachersDesc({teacher, onSendRequest}){
    const [user, setUser] = useState({});
    useEffect(() => {

        manageCache('user', 300, setUser, 'user');
    }, []);
    return (
        <div id={teacher.User.id}>
            <div>
                <img className="findTeacherImg"src="../logo192.png" alt='${teacher.prenom} ${teacher.nom}'/>
                <div>
                    <div id="teacherName">
                        <h2>{teacher.User.prenom} {teacher.User.nom} <span className="greyText"> · {teacher.city} </span></h2>
                    </div>
                    <div className='instrumentsTeach'>
                        {teacher.User.userInstruments.map((instrument, index) => {
                            return <p key={index} className="instrumentText">{instrument.Instrument.Name}</p>;
                        })}
                    </div>
                </div>
            </div>
            <p className="textDesc">{teacher.User.description}</p>
            {user && user.roles && user.roles.includes('ROLE_STUDENT') && (
                <button onClick={() => onSendRequest()}>Envoyer une demande</button>)
            }
            
        </div>
    )
}

let formSended = false;

function FindTeachersDiv(){
    const [teachers, setTeachers] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState([]);

    useEffect(() => {
        manageCache('instruments', 604800, setInstruments, 'instruments');

    }, []);


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.difficulty.value);
        console.log(e.target.instrument.value);
        console.log(e.target.ville.value);
        console.log(e.target.rythm.value);
        let difficulty = e.target.difficulty.value;
        let instrument = e.target.instrument.value;
        let ville = e.target.ville.value;
        let rythm = e.target.rythm.value;
        formSended = true;
        const fetchData = async () => {
            console.log("teachers?difficulty="+difficulty+"&instrument="+instrument+"&city="+ville+"&frequence="+rythm);
            await getAPI("teachers?difficulty="+difficulty+"&instrument="+instrument+"&city="+ville+"&frequence="+rythm, setTeachers);
        };
        fetchData();
    }

    //Geolocalisation
    function getPosition() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        }

        function showPosition(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(latitude, longitude);
            reverseGeocode(latitude, longitude);
        }
        
        function reverseGeocode(latitude, longitude) {
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const townName = findTownName(data);
                    console.log(townName);
                    let searchInput = document.querySelector('.SearchBar');
                    searchInput.value = townName;
                    DisplaySelect();
                    // handleSearch(townName);
                })
                .catch(error => {
                    console.error('Erreur:', error);
                });
        }
        
        function findTownName(data) {
            if(data.address.municipality != undefined){
                return data.address.municipality;
            } else if (data.address.suburb != undefined){
                return data.address.suburb;
            } 
            else {
                return 'Ville non trouvée';
            }
        }
    }

    //affiche les filtres un par un 
    function DisplaySelect(){
        let instruments = document.getElementById('instrumentSelect');
        let town = document.querySelector('.searchBtns');
        let rythm = document.getElementById('rythmSelect');
        let input = document.querySelector('.divSearchTeacher > form > input');

        if(instruments.style.display !== "block"){
            instruments.style.display = "block";
        }
        else if(town.style.display !== "flex"){
            town.style.display = "flex";
        }
        else if(rythm.style.display !== "block"){
            rythm.style.display = "block";
        }
        else if(input.style.display !== "block"){
            input.style.display = "block";
        }

    }

    return (
        <div className='content searchTeacher'>
            <GreyDiv content={
                <div className="divSearchTeacher">
                    <h2>Trouver un enseignant</h2>
                    <form onSubmit={handleSubmit}>
                        Je recherche un cours
                        <select id="difficulty" name="difficulty" onChange={DisplaySelect}>
                           <option value="">...</option> 
                           <option value="Débutant">Débutant</option>
                            <option value="Intermédiaire">Intermédiaire</option>
                            <option value="Avancé">Avancé</option>
                        </select>
                        <br/>
                        <div id="instrumentSelect">
                            de
                            <select id="instrument" name="instrument" onChange={DisplaySelect}>
                                <option value="">...</option>
                                {instruments.map((instrument, index) => {
                                    return <option key={index} value={instrument.id}>{instrument.Name}</option>;
                                })}
                            </select>
                        </div>
                        <div className="searchBtns">
                            à  
                            <button type="button" onClick={getPosition}>
                                <img src="/logo/icons/geoloc.png" alt="geoloc logo"/>
                            </button>
                            {/* <SearchBar onSearch={DisplaySelect}/> */}
                            <input type="text" name="ville" className="SearchBar" placeholder="Rechercher" onChange={DisplaySelect}/>
                        </div>
                        <div id="rythmSelect">
                            à un rythme de 
                            <select id="rythm" name="rythm" onChange={DisplaySelect}>
                                <option value="">...</option>
                                <option value="1">1 fois par semaine</option>
                                <option value="2">2 fois par semaine</option>
                            </select>
                        </div>
                        <input type="submit" value="Voir les cours" />
                    </form>
                </div>
            }/>
    
            {teachers.map((teacher, index) => {
                console.log(teacher);
                return <GreyDiv key={index} content={<TeachersDesc teacher={teacher} onSendRequest={() => setSelectedTeacher(teacher)} />}/>;
            })}
            {console.log(formSended, !formSended)}
            {teachers.length == 0 && formSended ?
                (<GreyDiv content={<p>Aucun enseignant trouvé</p>} />):
                null
            }
            {!formSended ? 
                (<img src="/logo/logo_harmonize.png" alt="logo harmonize"/>):
                null
            }

            {/* Afficher la popup si un professeur est sélectionné */}
            {selectedTeacher.length !=0 && (
                <SendCourseRequest teacher={selectedTeacher} onClose={() => setSelectedTeacher([])} />
            )}   
        </div>
    )
}

function SendCourseRequest({teacher, onClose}){
    useEffect(() => {
        document.querySelector(".searchTeacher").scrollTo({top: 0, left: 0, behavior: 'smooth'});
        
    }, []);
    const[request, setRequest] = useState({});
    const [user, setUser] = useState({});
    const [message, setMessage] = useState({});
    useEffect(() => {

        manageCache('user', 300, setUser, 'user');
    }, []);

    const sendRequest = async () => {
        let body ={}
        let values = document.querySelectorAll('select');
        values.forEach((value) => {
            if(value.value == ""){
                document.querySelector('.errorTeacher').style.display = "block";
            }
            else{
                body[value.name] = value.value;
            }
            
        });

        if(user.students && user.students.length != 0){
            body['idTeacher'] = teacher.id;
            body['idStudent'] = user.students[0].id;
            body['isPending'] = true;
            await postAPI(`cours`, setRequest, body);
            setTimeout(() => {onClose()}, 1500);

        }
    }

    useEffect(() => {
        if (Object.keys(request).length !== 0 && request.Student && request.Instrument && request.difficulty !== undefined) {
            let body = {
                "content": `${request.Student.User.prenom} ${request.Student.User.nom} souhaite prendre un cours ${request.Instrument.Name} ${request.difficulty} avec vous.`,
                "unread": true
            };
    
            const sendMessages = async () => {
                await postAPI(`cours/${request.id}/messages`, setMessage, body);
            };
    
            sendMessages();
        }
    }, [request]);
    return (
        <div  className="overlay" style={{display:"block"}}>
                <div className="overlayContent">
                    <p className="closeOverlay" onClick={onClose}>X</p>
                    <h2>Un cours avec {teacher.User.prenom} {teacher.User.nom} ?</h2>
                    <div className="overlayParams">
                        <label>
                            <p>Instrument</p>
                            <select name='idInstrument'>
                                <option value="">Instrument</option> 
                                {teacher.User.userInstruments.map((instrument, index) => {
                                    return <option key={index} value={instrument.Instrument.id}>{instrument.Instrument.Name}</option>;
                                })}
                            </select>
                        </label>

                        <label>
                            <p>Difficulté</p>
                            <select name='difficulty'>
                                <option value="">Difficulté</option>
                                <option value="Débutant">Débutant</option>
                                <option value="Intermédiaire">Intermédiaire</option>
                                <option value="Avancé">Avancé</option>
                            </select>
                        </label>
                    </div>
                    <p className='errorTeacher'>Veuillez choissir un instrument & une difficulté</p>
                    <button onClick={sendRequest}>Envoyer une demande</button>
                </div>
        </div>
    )
}

export default function FindTeachersPage(){

    return (
        <FindTeachersDiv  />
    );
};