import React, { useState, useEffect } from 'react';
import './findTeacher.css';
import GreyDiv from '../components/GreyDiv.js';
import SearchBar from '../components/SearchBar.js';
import { getAPI, postAPI } from '../components/fetchAPI.js';
import { Link } from 'react-router-dom';

function TeachersDesc({teacher, onSendRequest}){
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            await getAPI("user", setUser);
        };
        fetchData();
    }, []);
    return (
        <div id={teacher.User.id}>
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
            <p className="textDesc">{teacher.User.description}</p>
            {user && user.roles && user.roles.includes('ROLE_STUDENT') && (
                <button onClick={() => onSendRequest()}>Envoyer une demande</button>)
            }
            
        </div>
    )
}


function FindTeachersDiv(){
    const [teachers, setTeachers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getAPI("teachers", setTeachers);
        };
        fetchData();

    }, []);

    useEffect(() => {
        if (teachers.length > 0){
            setFilteredData(teachers);
        }
    }, [teachers])

    
    const handleSearch = (searchTerm) => {
        if (searchTerm === '') {
            setFilteredData(teachers);
            return;
        }
    
        const filteredResults = teachers.filter((item) => {
            if (item.city !== null) {
                return item.city.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return false; 
        });
    
        setFilteredData(filteredResults);
    };


    return (
        <div className='content searchTeacher'>
            <GreyDiv content={
                <div className="divSearchTeacher">
                    <h2>Trouver un enseignant</h2>
                    <div className="searchBtns"> 
                        <Link to="/nextVersion"> 
                            <button>Autour de moi</button>
                        </Link>
                        <SearchBar onSearch={handleSearch}/>
                    </div>
                </div>
            }/>
            {filteredData.map((teacher, index) => {
                return <GreyDiv key={index} content={<TeachersDesc teacher={teacher} onSendRequest={() => setSelectedTeacher(teacher)} />}/>;
            })}

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
        const fetchData = async () => {
            await getAPI("user", setUser);
        };
        fetchData();
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