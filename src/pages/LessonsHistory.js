import React, { useState, useEffect } from 'react';
import './LessonsHistory.css';
import GreyDiv from '../components/GreyDiv.js';
import SimpleHeader from '../components/simpleHeader.js';
import InstrumentText from '../components/InstrumentText.js';
import { Link, useParams } from 'react-router-dom';
import CheckLogin from '../components/checkLogin.js';

function History({lessons, studentId}){

    const student = students.filter((student) => student.id == studentId)[0];

    function formatDate(date) {
        return (
            date.getDate() + 
            "/" + ('0'+(date.getMonth()+1)).slice(-2) +   "/" + date.getFullYear() +
            " - " + date.getHours() + "h" + ('0'+(date.getMinutes())).slice(-2) 
        )
    }
    
    //Masque les div d'exercices vides
    function clearExercices(){
        let exoDiv = document.querySelectorAll('.exercices');
        let exos = document.querySelectorAll('.exercices > div');
        for (let i = 0; i < exos.length; i++) {
            if(!exos[i].childNodes[0]){
                exoDiv[i].style.display = "none";
            }
        }
    }

    // ToReviewBorder();
    
    //Après le rendu
    useEffect(() => {
        clearExercices();
    }, []);

    //Range les cours dans l'ordre chronologique
    lessons.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });

    return (
        <div className="content LessonsHistory">
            <h1>Historique des cours de {student.firstName} {student.lastName}</h1>
            {lessons.map((lesson, index) => {
                if (index === 0) {
                    if( new Date(lesson.endAt).getTime() > new Date().getTime()){  
                        return null;//Si le cours n'est pas encore terminé
                    }//Si le cours est en cours) 
                }  
                return(
                    <Link key={index} to={`./${lesson.id}`}>
                        <GreyDiv
                            key={index}
                            content={
                            <div id={student.id}>
                                <div className='lessonHeader'>
                                    <div>
                                        <h2> {lesson.title}</h2>
                                    </div>   
                                </div>
                                <p>{lesson.desc}</p>
                                <div className='nextLesson'>
                                    <p>Date du cours :</p>
                                    <div>{formatDate(new Date(lesson.date))}</div>
                                </div>
                                <div className='exercices'>
                                    <p>Exercices</p>
                                    <div>
                                        {lesson.exercices && lesson.exercices.length > 0 ? lesson.exercices.map((exercice, index) => (
                                            <span key={index} className={`${exercice.state}`}></span>
                                        )) : null}
                                    </div>
                                </div>
                            </div>
                            }
                        /> 
                    </Link> 
                )
            })}
        </div> 
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
    date: "2023-04-15 15:00:00",
    endAt: "2024-01-18 09:00:00",
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
    studentId: 5,
    title: "Piano débutant", 
    desc: "Apprendre les notes de musique",
    date: "2021-04-15 15:00:00",
    endAt: "2021-04-15 16:00:00",
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
    studentId:5,
    title: "Piano débutant", 
    desc: "Apprendre les notes de musique",
    date: "2022-04-15 16:00:00",
    endAt: "2022-04-15 17:00:00",
    exercices: null,
    },
]


export default function LessonsHistory(){
    return (
        <div>
            <SimpleHeader />
            <History studentId={useParams().studentId} lessons={lessons}/>
        </div>
     
    );
};