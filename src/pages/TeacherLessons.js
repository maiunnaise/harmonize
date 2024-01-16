import React, { useState, useEffect } from 'react';
import './TeacherLessons.css';
import GreyDiv from '../components/GreyDiv.js';
import SimpleHeader from '../components/simpleHeader.js';
import InstrumentText from '../components/InstrumentText.js';
import { Link, useParams } from 'react-router-dom';
import CheckLogin from '../components/checkLogin.js';

function Lesson(lessonId){
    CheckLogin();
    let lesson, student;
    console.log(lessonId.lessonId);
    lessons.map((l, index) => {
        console.log(l.id, lessonId.lessonId);
        if(l.id == lessonId.lessonId){
            console.log("aaa");
            lesson = l;
        }
    });
    students.map((s, index) => {
        if(s.id === lesson.studentId){
            student = s;
        }
    });

    function formatDate(date) {
        return (
            date.getDate() + 
            "/" + ('0'+(date.getMonth()+1)).slice(-2) + 
            " - " + date.getHours() + "h" + ('0'+(date.getMinutes())).slice(-2)
        )
    }

    return (
        <>
        <SimpleHeader/>
  
        <div className="simpleContent">
            <div className="lessonStudentPicName">
                <img src="../logo192.png" alt="profile"/>
                <div>
                    <h2>{student.firstName}<br/> {student.lastName}</h2>
                    <p>{lesson.title}</p>
                </div>
            </div>
            <GreyDiv content={
                <div className="lessonStudentDetails">
                    <h2>Instruments</h2>
                    <div className="lessonStudentInstruments">
                        {student.instruments.map((instrument, index) => {
                            return <InstrumentText key={index} index={index} text={instrument}/>;
                        })}
                    </div>
                    <hr></hr>
                    <p>{lesson.desc}</p>
                    <div className='nextLesson'>
                        <p>Prochain cours :</p>
                        <div>{formatDate(new Date(lesson.date))}</div>
                    </div>
                    <div className="exercices">
                        {lesson.exercices && lesson.exercices.length > 0 ? 
                            <h3>Exercices</h3> 
                        : null}
                        {lesson.exercices && lesson.exercices.length > 0 ? lesson.exercices.map((exercice, index) => (
                            <div>
                                <div>
                                    <div>
                                        <span key={index} className={`${exercice.state}`}></span>
                                        <p>{exercice.desc}</p>
                                    </div>
                                    <Link to={`../exercices/${exercice.id}`} ><button className={`${exercice.state}Btn`}>Voir</button></Link>
                                </div>
                                <hr></hr>
                            </div>
                        )) : null}
                    </div>
                    <div className='buttons'>
                        <button>Ajouter un exercice</button>
                        <Link to={`/message/${student.id}`} className='inboxLink'>
                            <button>Message</button>
                        </Link>
                    </div>
                </div>
            }/>
            <div className="lessonStudentHistoryBtn">
                <Link to="./edit">
                    <button>Modifier informations</button>
                </Link>
            </div>
        </div>
        </>
    )
}

let students = [
    {id: 5, 
    img: "https://www.w3schools.com/howto/img_avatar.png",
    firstName: "Meejez", 
    lastName: "Eztzert",
    instruments: ["Piano","Guitare"],
    },
    {id: 4, 
    img: "https://www.w3schools.com/howto/img_avatar.png",
    firstName: "Drtud", 
    lastName: "Ttttt",
    instruments: ["Piano","Guitare"],
    },
    {id: 3, 
    img: "https://www.w3schools.com/howto/img_avatar.png",
    firstName: "Xbcxvb", 
    lastName: "Wertzert",
    instruments: ["Piano","Guitare"],
    },
]

let lessons = [
    {id: 1, 
    studentId: 5,
    title: "Piano débutant", 
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    date: "2021-04-15 15:00:00",
    exercices: [
        {id: 1,
        title: "Exercice 1",
        desc: "Apprendre les notes de musique",
        state: "finished",
        },
        {id: 2,
        title: "Exercice 2",
        desc: "Apprendre les notes de musique",
        state: "reviewed",
        },
        {id: 3,
        title: "Exercice 2",
        desc: "Apprendre les notes de musique",
        state: "toDo",
        },
        {id: 4,
        title: "Exercice 2",
        desc: "Apprendre les notes de musique",
        state: "toDo",
        },
    ],
    },
    {id: 2, 
    studentId: 4,
    title: "Piano débutant", 
    desc: "Apprendre les notes de musique",
    date: "2021-04-15 15:00:00",
    exercices: [
        {id: 1,
        title: "Exercice 1",
        desc: "Apprendre les notes de musique",
        state: "finished",
        },
        {id: 2,
        title: "Exercice 2",
        desc: "Apprendre les notes de musique",
        state: "reviewed",
        },
        {id: 2,
        title: "Exercice 2",
        desc: "Apprendre les notes de musique",
        state: "toDo",
        },
    ],
    },
    {id: 3, 
    studentId:3,
    title: "Piano débutant", 
    desc: "Apprendre les notes de musique",
    date: "2022-04-15 15:00:00",
    exercices: null,
    },
]


export default function TeacherLessons(){
    return (
        <Lesson lessonId={useParams().lessonId} />
    );
};