import './homeStudent.css';
import PurpleDiv from '../components/PurpleDiv';
import GreyDiv from '../components/GreyDiv';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAPI } from '../components/fetchAPI';
import EmptyInstruments from '../components/emptyInstruments';

function getNextClass(seances){
    let today = Date.now();
    seances = Array.from(seances);
    let nextClass;
    seances.map((seance) => {
        let startAt = Date.parse(seance.startAt);
        let endAt = Date.parse(seance.endAt);

        if (today < startAt && today < endAt){
            return nextClass = seance;
        }
    });
    return nextClass;
}

function formatDate(date, param){
    let format;
    if(param == "date"){
        format = new Date(date);
        format = format.toLocaleDateString('fr-FR', { month: 'numeric', day: 'numeric', year: 'numeric'});
    }
    else if(param == "time"){
        format = date.split("T")[1];
        let matchFormat = format.match(/^(\d{2}:\d{2})/);
        format = matchFormat ? matchFormat[1] : null;
    }
    

    return format;
};

function Course({course}){

    let nextClass = getNextClass(course.seances);
    return (
        <div className='courseContent'>
            <h2 className='CourseName coursePadding'>{course.Instrument.Name} <span style={{color:"#B0B0B0"}}>- {course.difficulty}</span></h2>
            <PurpleDiv content={<Seance seance= {nextClass}/>}/>
            {course.Teacher.User.gender =="male" ? <p className='CourseTeach coursePadding'>M.   {course.Teacher.User.nom}</p> : <p className='CourseTeach coursePadding'>Mme. {course.Teacher.User.nom}</p>}
            <h3 className='CourseActivities coursePadding'>Activités</h3>
            {nextClass.activities.map((exercice) => {
                let dueAt = formatDate(nextClass.startAt, 'date');
                return <Actvity activity={exercice} dueAt={dueAt} course={course.id}/>;
            })}
        </div>
    );
}

function Seance({seance}){
    let date = new Date(seance.startAt);
    date = date.toLocaleDateString('fr-FR', {weekday: 'long', month: 'long', day: 'numeric'});
    date = date.replace(/^(.)/, (match) => match.toUpperCase());

    
    let startAt = formatDate(seance.startAt, 'time');

    let endAt = formatDate(seance.endAt, 'time');
    return (
        <div className='Seance'>
            <h2>{date}</h2>
            <p>{startAt} - {endAt}</p>
            <p className='SeanceDesc'>{seance.description}</p>
        </div>
    );
}

function Actvity({activity, dueAt, course}){

    return(
        <div className='courseActivity'>
            <div className={activity.status =="toDo" ? "redAct": activity.status=="finished" ? "greenAct" :activity.status== "review"? "orangeAct" : null}></div>
            <div className='courseActivityLine'>
                <p>{activity.title}</p>
                <p>pour le {dueAt}</p>
            </div>
            <Link to={`/activity/${course}/${activity.id}`} className='courseActivityButton'> {/* //faire passer l'id de l'activité */}
                <button>Voir</button>
            </Link>
        </div>
    )
}


export default function HomeStudent(){
    const [courses, setCourses] = useState([]);
    const [instrumentUser, setInstrumentUser] = useState([]);
    const [instrument, setInstrument] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getAPI('cours', setCourses);
            await getAPI('user-instruments', setInstrumentUser);
        };
        const fetchInstruments = async () => {
            await getAPI('instruments', setInstrument);
        };

        fetchData();
        if(instrumentUser.length == 0){
            let overlay = document.querySelector('.overlay');
            overlay.style.display = 'block';
            fetchInstruments();
        }

    }, []);

    console.log(instrument);

    return (
        <div className="homeStudent content">
            <EmptyInstruments instrument={instrument}/>
            {courses.length ==0 ? <p className='emptyCourse'>Pas de cours disponible</p> : courses.map((course) => {
                return <GreyDiv content={<Course course={course} />}/>;
            })}
        </div>
    );
}