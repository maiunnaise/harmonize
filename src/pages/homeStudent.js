import './homeStudent.css';
import PurpleDiv from '../components/PurpleDiv';
import GreyDiv from '../components/GreyDiv';

function Course({course}){
    return (
        <div className='courseContent'>
            <h2 className='CourseName'>{course.name} <span style={{color:"#B0B0B0"}}>- {course.difficulty}</span></h2>
            <PurpleDiv content={<Seance seance= {course.nextClass}/>}/>
            {course.teacher.gender =="male" ? <p className='CourseTeach'>M. {course.teacher.name}</p> : <p className='CourseTeach'>Mme. {course.teacher.name}</p>}
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

const courses = [
    {name:"Guitare", difficulty:"Débutant", 
        teacher:{
            name:"Dupont", gender:"male"
        },
        nextClass:{
            date:"13-12-2023", startedAt :"9h30", endedAt:"11h30", description :"Travail sur le solfège lalalala"
        },
        exercices:{
            0:{
                name:"Jouer partition 1", dueAt:"14/12/2023", status:"toDo"
            },
            1:{
                name:"Jouer partition 2", dueAt:"14/12/2023", status:"done"
            }
        }
    },
    {name:"Basse", difficulty:"Débutant", 
        teacher:{
            name:"Patate", gender:"female"
        },
        nextClass:{
            date:"13-12-2023", startedAt :"9h30", endedAt:"11h30", description :"Travail sur le solfège lalalala"
        },
        exercices:{
            0:{
                name:"Jouer partition 1", dueAt:"14/12/2023", status:"toDo"
            },
            1:{
                name:"Jouer partition 2", dueAt:"14/12/2023", status:"done"
            }
        }
    }
];

export default function HomeStudent(){
    return (
        <div className="homeStudent content">
            {courses.map((course, index) => {
                return <GreyDiv content={<Course key={index} course={course} />}/>;
            })}
        </div>
    );
}