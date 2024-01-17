import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TeacherHome.css';
// import PurpleButton from '../components/PurpleButton.js';
import GreyDiv from '../components/GreyDiv.js';
import SearchBar from '../components/SearchBar.js';
import { getAPI, postAPI, deleteAPI, putAPI} from '../components/fetchAPI.js';


function Home({lessons, students}){
    const [filteredData, setFilteredData] = useState(students);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        const filteredResults = students.filter((item) =>
          item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredResults);
    };

    //Ajoute une border si exercice terminé à voir
    useEffect(() => {
        let lessons = document.querySelectorAll('.GreyDiv');
        for (let i = 0; i < lessons.length; i++) {
            let finished = lessons[i].querySelectorAll('.finished');
            if (finished.length != 0){
                lessons[i].classList.add('toReview');
            }
            else {
                lessons[i].classList.remove('toReview');
            }
        }
    }, [searchTerm]);


    function getLessonsByStudentId(id) {
        return lessons.filter(lesson => lesson.studentId === id)[0];
    }

    function formatDate(date) {
        return (
            date.getDate() + 
            "/" + ('0'+(date.getMonth()+1)).slice(-2) + 
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

    return (
        <div className="content TeacherHome">
            <h1>Mes élèves</h1>
            <SearchBar onSearch={handleSearch} />
            {filteredData.map((student, index) => {
                let lesson = getLessonsByStudentId(student.id);
                if(lesson == undefined){
                    return(null);
                }

                return(
                    <Link key={index} to={`/teacherLessons/${lesson.id}`}>
                        <GreyDiv
                            key={index}
                            content={
                            <div id={student.id}>
                                <div className='lessonHeader'>
                                    <img src={student.img} alt={`${student.firstName} ${student.lastName}`}/>
                                    <div>
                                        <h2>{`${student.firstName} ${student.lastName}`}</h2>
                                        <h2 className="greyText"> {lesson.title}</h2>
                                    </div>   
                                </div>
                                <p>{lesson.desc}</p>
                                <div className='nextLesson'>
                                    <p>Prochain cours :</p>
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
    },
    {id: 4, 
    img: "https://www.w3schools.com/howto/img_avatar.png",
    firstName: "Drtud", 
    lastName: "Ttttt",
    },
    {id: 3, 
    img: "https://www.w3schools.com/howto/img_avatar.png",
    firstName: "Xbcxvb", 
    lastName: "Wertzert",
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
    date: "2021-08-15 12:00:00",
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
    studentId: 3,
    title: "Piano débutant", 
    desc: "Apprendre les notes de musique",
    date: "2021-04-15 16:00:00",
    exercices: null,
    },
]

function sortStudents(students, lessons){
    
    lessons = lessons.sort(function(a, b){
        let dateA = new Date(a.date).getTime();
        let dateB = new Date(b.date).getTime();
        if (dateA > dateB) {
            return -1;
        }
    });

    var studentsOrder = [];

    lessons.forEach(lesson => {
        let student = students.filter(student => student.id === lesson.studentId )[0];
        studentsOrder.push(student);
    });

    return studentsOrder;
}
// console.log(students, sortStudents(students, lessons) );
students = sortStudents(students, lessons);

export default function TeacherHome(){
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         await putAPI('seances/12',6,{"startAt": "2023-13-29T15:00:00Z","endAt": "2023-13-20T16:00:00Z"});
    //     };

    //     fetchData();
    // }, []);
    return (
    <Home lessons={lessons} students={students}/>
    );
};