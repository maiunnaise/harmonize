import React, { useState, useEffect } from 'react';
import './editLesson.css';
import GreyDiv from '../components/GreyDiv.js';
import SimpleHeader from '../components/simpleHeader.js';
import InstrumentText from '../components/InstrumentText.js';
import { useParams } from 'react-router-dom';
import CheckLogin from '../components/checkLogin.js';
import { getAPI, postAPI} from '../components/fetchAPI.js';




function Lesson({data}){
    const cours = data.cours;
    
    const [data2,setData] = useState([]);
    const sendData = async (event) => {
        const formData = new FormData(event.target); 
        event.preventDefault();
        let obj = {};
        for (let pair of formData.entries()) {
            obj[pair[0]] = pair[1];
        }

        const fetchData = async () => {
            await postAPI("cours/"+cours.id+"/seances", setData,obj);
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
            <SimpleHeader route={"/teacher/home"}/>
    
            <div className="simpleContent ">
                <div className="editLessonPicName">
                    <img src="/logo/icons/avatar.png" alt="profile"/>
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
                            <div className='nextLesson'>
                                <p>Début du cours :</p>
                                <input type="datetime-local" name="startAt"></input>
                            </div>
                            <div className='nextLesson'>
                                <p>Fin du cours :</p>
                                <input type="datetime-local" name="endAt"></input>
                            </div>                       
                        </div>
                        
                        
                    }/>
                    <div className="validateBtn">
                        <button type="submit">Créer une séance</button>
                    </div>
                </form>
            </div>
            </>
        )
    }
}


export default function AddLesson(){
    CheckLogin();
    const coursId = useParams().coursId;
    const [cours, setCours] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            await getAPI("cours/"+coursId, setCours);
        };

        fetchData();
    }, []); 
    const data = {cours};

    return (
        <Lesson data={data} /> 
    );
};