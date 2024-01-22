import React, { useState, useEffect } from 'react';
import './TeacherLessons.css';
import GreyDiv from '../components/GreyDiv.js';
import SimpleHeader from '../components/simpleHeader.js';
import InstrumentText from '../components/InstrumentText.js';
import { Link, useParams } from 'react-router-dom';
import CheckLogin from '../components/checkLogin.js';
import { getAPI, postAPI, deleteAPI, putAPI} from '../components/fetchAPI.js';



function Lesson({cours, seance, activities}){
    CheckLogin();

    function formatDate(date) {
        return (
            date.getDate() + 
            "/" + ('0'+(date.getMonth()+1)).slice(-2) + 
            " - " + date.getHours() + "h" + ('0'+(date.getMinutes())).slice(-2)
        )
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
            <SimpleHeader route={"/teacher/home"}/>
            
            <div className="simpleContent">
                <div className="lessonStudentPicName">
                    <img src="/logo/icons/avatar.png" alt="profile"/>
                    <div>
                        <h2>{cours.Student.User.prenom}<br/> {cours.Student.User.nom}</h2>
                        <p>{cours.Instrument.Name} {cours.difficulty}</p>
                    </div>
                </div>
                <GreyDiv content={
                    <div className="lessonStudentDetails">
                        <h2>Instruments</h2>
                        <div className="lessonStudentInstruments">
                            {userInstruments.map((instrument, index) => {
                                return <InstrumentText key={index} index={index} text={instrument.Instrument.Name}/>;
                            })}
                        </div>
                        <hr></hr>
                        <p>{seance.description}</p>
                        <div className='nextLesson'>
                            <p>Prochain cours :</p>
                            <div>{formatDate(new Date(seance.startAt))}</div>
                        </div>
                        <div className="exercices">
                            {activities.length > 0 ? 
                                <h3>Exercices</h3> 
                            : null}
                            {activities.length > 0 ? activities.map((exercice, index) => (
                                <div>
                                    <div>
                                        <div>
                                            <span key={index} className={`${exercice.status}`}></span>
                                            <p>{exercice.title}</p>
                                        </div>
                                        <Link to={`../activity/${cours.id}/${exercice.id}`} ><button className={`${exercice.status}Btn`} >Voir</button></Link>
                                    </div>
                                    <hr></hr>
                                </div>
                            )) : null}
                        </div>
                        <div className='buttons'>
                                <Link to={`/teacher/editLesson/${cours.id}/${seance.id}`}>
                                    <button>Modifier le cours</button>
                                </Link>
                            <Link to={`/message/${cours.id}`} className='inboxLink'>
                                <button>Message</button>
                            </Link>
                        </div>
                    </div>
                }/>
                <div className="lessonStudentHistoryBtn">
                    <Link to={`/history/${cours.Student.id}`}>
                        <button>Historique</button>
                    </Link>
                </div>
            </div>
            </>
        )
    }
}

export default function TeacherLessons(){
    const coursId = useParams().coursId;
    const seanceId = useParams().seanceId;
    const [seance, setSeance] = useState([]);
    const [cours, setCours] = useState([]);
    const [activities, setActivities] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            await getAPI("cours/"+coursId+"/seances/"+seanceId, setSeance);
            await getAPI("cours/"+coursId, setCours);
            await getAPI("cours/"+coursId+"/activities?limit=20", setActivities);
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

    return (
        cours.id !== undefined && seance.id !== undefined ?
        <Lesson  cours={cours} seance={seance} activities={seanceActivities}/>:
        null
    );
};