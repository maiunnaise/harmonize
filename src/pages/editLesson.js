import React, { useState, useEffect } from 'react';
import './editLesson.css';
import GreyDiv from '../components/GreyDiv.js';
import SimpleHeader from '../components/simpleHeader.js';
import InstrumentText from '../components/InstrumentText.js';
import { Link, useParams } from 'react-router-dom';
import CheckLogin from '../components/checkLogin.js';
import { getAPI, postAPI, deleteAPI, putAPI} from '../components/fetchAPI.js';
// import { act } from 'react-dom/test-utils/index.js';




function Lesson({data}){
    const coursId = useParams().coursId;
    const seanceId = useParams().seanceId;
    const [isActive, setIsActive] = useState(false);

    const cours = data.cours;
    const seance = data.seance;
    const activities = data.seanceActivities;
    const partitions = data.partitions;

    const sendData = async (event) => {
        const formData = new FormData(event.target); 
        event.preventDefault();
        let obj = {};
        for (let pair of formData.entries()) {
            obj[pair[0]] = pair[1];
        }
        console.log(obj);

        const fetchData = async () => {
            await putAPI("cours/"+coursId+"/seances/"+seanceId, obj);
        };

        fetchData();
        window.location.href = "/teacher/teacherLessons/"+coursId+"/"+seanceId;
    }

    const addActivities = async (event) => {
        event.preventDefault();
        setIsActive(current => !current);

        let close = document.getElementById('close');

        if (!close.hasEventListener) {
            close.addEventListener('click', function() {
                setIsActive(current => !current);
            });
            close.hasEventListener = true; 
        }

    }

    const [activities2, setActivities] = useState([]);
    const sendNewActivities = async (event) => {
        event.preventDefault();
        // const [setData] = useState([]);
        const formData = new FormData(event.target); 
        
        let obj = {};
        obj["idSeance"] = seanceId;
        for (let pair of formData.entries()) {
            obj[pair[0]] = pair[1];
        }   
        obj["status"] = "toDo";
        console.log(JSON.stringify(obj));

        const fetchData = async () => {
            await postAPI("cours/"+coursId+"/activities",setActivities, obj);
        };

        fetchData();
        window.location.href = "/teacher/teacherLessons/"+coursId+"/"+seanceId;
    }   

    const RemoveExercice = async (event, id) => {
        event.preventDefault();
        const fetchData = async () => {
            await deleteAPI("cours/"+coursId+"/activities/"+id);
        };

        fetchData();
        setTimeout(() => {
            window.location.href = "/teacher/teacherLessons/"+coursId+"/"+seanceId;
        }, 800);
    }

    const deleteSeance = async (event) => {
        event.preventDefault();
        const fetchData = async () => {
            await deleteAPI("cours/"+coursId+"/seances/"+seanceId);
        };

        fetchData();

        window.location.href = "/teacher/home";
    }
    
    const [student, setStudent] = useState([]);
    useEffect(() => {
        if (cours && cours.Student) {
            const fetchData = async () => {
                await getAPI("students/" + cours.Student.id, setStudent);
            };
            fetchData();
        }
    }, [cours]);

    var userInstruments = [];
    if(student.id != undefined){
        userInstruments = student.User.userInstruments;
    }

    if(cours.id != undefined){
        
        return (
            <>
            <SimpleHeader/>
    
            <div className="simpleContent ">
                <div className="editLessonPicName">
                    <img src="../logo192.png" alt="profile"/>
                    <div>
                        <h2>{cours.Student.User.prenom}<br/> {cours.Student.User.nom}</h2>
                        <p>{cours.Instrument.Name} {cours.difficulty}</p>
                    </div>
                </div>
                <form action=""  id="formLesson" onSubmit={sendData} >
                    <GreyDiv content={
                        
                        <div className="editLessonDetails">
                            <h2>Instruments</h2>
                            <div className="editLessonInstruments">
                                {userInstruments.map((instrument, index) => {
                                    return <InstrumentText key={index} index={index} text={instrument.Instrument.Name}/>;
                                })}
                            </div>
                            <hr></hr>
                            <textarea rows="4" name="description" defaultValue={seance.description}></textarea>
                            <div className='nextLesson'>
                                <p>Début du cours :</p>
                                <input type="datetime-local" name="startAt" defaultValue={formatDate(seance.startAt)}></input>
                            </div>
                            <div className='nextLesson'>
                                <p>Fin du cours :</p>
                                <input type="datetime-local" name="endAt" defaultValue={formatDate(seance.endAt)}></input>
                            </div>
                            <div className="exercices">
                                {activities && activities.length > 0 ? 
                                    <h3>Exercices</h3> 
                                : null}
                                {activities && activities.length > 0 ? activities.map((exercice, index) => (
                                    <div key={exercice.id}>
                                        <div>
                                            <div>
                                                <span key={index} className={`${exercice.status}`}></span>
                                                <p>{exercice.title}</p>
                                            </div>
                                            <div>
                                                <Link to={`../exercices/${exercice.id}`} ><button type="button" className={`${exercice.status}Btn`}>Voir</button></Link>
                                                <button type="button" onClick={(event) => RemoveExercice(event, exercice.id)}>x</button>
                                            </div>
                                        </div>
                                        <hr></hr>
                                    </div>
                                )) : null}
                            </div>
                            <div className='buttons'>
                                <button onClick={addActivities}>Ajouter un exercice</button>
                                <button onClick={(event) => deleteSeance(event)}>Supprimer le cours</button>
                            </div>
                           
                        </div>
                        
                        
                    }/>
                    <div className="validateBtn">
                        <button type="submit">Valider</button>
                    </div>
                </form>
                <div className="editLessonPopUp" >
                    <div id='overlay' style={{
                            display: isActive ? 'block' : 'none',
                            }}>
                        <div id='popup'>
                            <div id='close'>&#10006;</div>
                            <h2>Ajouter un exercice</h2>
                            <form onSubmit={sendNewActivities}>
                                <div>
                                    <h3>Titre : </h3>
                                    <input type="text" name="title"></input>
                                </div>
                                <div>
                                    <h3>Contenu :</h3> 
                                    <textarea rows="4" name="Content"></textarea>
                                </div>  
                                <div>
                                    <h3>Partition :</h3> 
                                    <select name='idSheet'>
                                        <option value=""></option>
                                        {partitions.map((partition, index) => {    
                                            return <option key={partition.Sheet.id} value={partition.Sheet.id}>{partition.Sheet.title}</option>
                                        })}
                                    </select>
                                </div> 
                                <div>
                                    <h3>Fichier :</h3> 
                                    <input type="file" id="file" name="file" accept="image/png, image/jpeg, application/pdf" />  
                                </div>
                                <button type="submit">Valider</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

//Retourne la date au format YYYY-MM-DDTHH:MM pour les defaultValue des inputs
function formatDate(date){
    const parsedDate = new Date(date);
    const pad = (value) => value.toString().padStart(2, '0');
    return `${parsedDate.getFullYear()}-${pad(parsedDate.getMonth() + 1)}-${pad(parsedDate.getDate())}T${pad(parsedDate.getHours())}:${pad(parsedDate.getMinutes())}`;
}


export default function EditLesson(){
    CheckLogin();
    const coursId = useParams().coursId;
    const seanceId = useParams().seanceId;
    const [seance, setSeance] = useState([]);
    const [cours, setCours] = useState([]);
    const [activities, setActivities] = useState([]);
    const [partitions, setPartitions] = useState([]);
    console.log(coursId, seanceId);
    useEffect(() => {
        const fetchData = async () => {
            await getAPI("cours/"+coursId+"/seances/"+seanceId, setSeance);
            await getAPI("cours/"+coursId, setCours);
            await getAPI("cours/"+coursId+"/activities?limit=20", setActivities);
            await getAPI("vault-sheets", setPartitions);
        };

        fetchData();
    }, []);

    //Les activités de la séance
    const seanceActivities = [];
    if(activities.length != 0){
        activities.map((activity, index) => {
            if(activity.Seance.id == seance.id){
                seanceActivities.push(activity);
            }
        });
    }   

    const data = {cours, seance, seanceActivities, partitions};
    return (
        <Lesson  data={data} />
    );
};