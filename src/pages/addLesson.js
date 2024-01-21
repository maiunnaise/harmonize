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
    console.log(data);

    const cours = data.studentCourse;

    console.log(cours);
    
    const [data2,setData] = useState([]);
    const sendData = async (event) => {
        const formData = new FormData(event.target); 
        event.preventDefault();
        let obj = {};
        for (let pair of formData.entries()) {
            obj[pair[0]] = pair[1];
        }
        console.log(obj);

        const fetchData = async () => {
            await postAPI("cours/"+cours.id+"/seances/", setData,obj);
        };

        fetchData();
        // window.location.href = "/teacher/home";
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
                            {/* <div className="editLessonInstruments">
                                {student.instruments.map((instrument, index) => {
                                    return <InstrumentText key={index} index={index} text={instrument}/>;
                                })}
                            </div> */}
                            <hr></hr>
                            {/* <textarea rows="4" name="description"></textarea> */}
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
    const studentId = useParams().studentId;
    const [cours, setCours] = useState([]);
    const [studentCourse, setStudentCourse] = useState(null); 
    const [seances, setSeance] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getAPI("cours", setCours);
        };

        fetchData();
    }, []);

    let data = null; 

    if (cours.length != 0 && studentCourse.length != 0){
        data = {studentCourse}; 
    }

    useEffect(() => {
        var studentCours= [];
        //Récupérer le cours de l'élève à partir de son id
        for(let i = 0; i < cours.length; i++){
            if(cours[i].Student.User.id == studentId){
                studentCours = cours[i];
            }
        }

        setStudentCourse(studentCours); 
        
    }, [cours]);

    useEffect(() => {
        if (!studentCourse) return; 

        const fetchData = async () => {
            await getAPI("cours/"+studentCourse.id+"/seances", setSeance);
        };

        fetchData();
    }, [studentCourse]); 
    console.log(data);

    return (
        data !== null ? 
        <Lesson data={data} /> :
        null
    );
};