import './homeStudent.css';
import PurpleDiv from '../components/PurpleDiv';
import GreyDiv from '../components/GreyDiv';
import { Link } from 'react-router-dom';
import HistoryButton from '../components/HistoryButton';

function Course({course}){
    return (
        <div className='courseContent'>
            <h2 className='CourseName coursePadding'>{course.name} <span style={{color:"#B0B0B0"}}>- {course.difficulty}</span></h2>
            <PurpleDiv content={<Seance seance= {course.nextClass}/>}/>
            {course.teacher.gender =="male" ? <p className='CourseTeach coursePadding'>M.   {course.teacher.name}</p> : <p className='CourseTeach coursePadding'>Mme. {course.teacher.name}</p>}
            <h3 className='CourseActivities coursePadding'>Activités</h3>
            {course.exercices.map((exercice) => {
                return <Actvity activity={exercice}/>;
            })}
        </div>
    );
}

function Seance({seance}){
    return (
        <div className='Seance'>
            <h2>{seance.date}</h2>
            <p>{seance.startedAt} - {seance.endedAt}</p>
            <p className='SeanceDesc'>{seance.description}</p>
        </div>
    );
}

function Actvity({activity}){
    return(
        <div className='courseActivity'>
            <div className={activity.status =="toDo" ? "redAct": "greenAct"}></div>
            <div className='courseActivityLine'>
                <p>{activity.name}</p>
                <p>pour le {activity.dueAt}</p>
            </div>
            <Link to={`/activity/${activity.id}`} className='courseActivityButton'> {/* //faire passer l'id de l'activité */}
                <button>Voir</button>
            </Link>
        </div>
    )
}

const courses = [
    {name:"Guitare", difficulty:"Débutant", 
        teacher:{
            name:"Dupont", gender:"male"
        },
        nextClass:{
            date:"13-12-2023", startedAt :"9h30", endedAt:"11h30", description :"Travail sur le solfège lalalala"
        },
        exercices:[
            {
                id:0, name:"Jouer partition 1", dueAt:"14/12/2023", status:"toDo"
            },
            {
                id:1, name:"Jouer partition 2", dueAt:"14/12/2023", status:"done"
            }
        ]
    },
    {name:"Basse", difficulty:"Débutant", 
        teacher:{
            name:"Patate", gender:"female"
        },
        nextClass:{
            date:"13-12-2023", startedAt :"9h30", endedAt:"11h30", description :"Travail sur le solfège lalalala"
        },
        exercices:[
            {
                id:2, name:"Jouer partition 3", dueAt:"14/12/2023", status:"toDo"
            },
            {
                id:3, name:"Jouer partition 4", dueAt:"14/12/2023", status:"done"
            }
        ]
    }
];

export default function HomeStudent(){
    return (
        <div className="homeStudent content">
            {courses.map((course) => {
                return <GreyDiv content={<Course course={course} />}/>;
            })}

            <HistoryButton buttonText={"Historique d'activités"}/>
        </div>
    );
}