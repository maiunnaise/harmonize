import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TeacherHome.css';
import GreyDiv from '../components/GreyDiv.js';
import SearchBar from '../components/SearchBar.js';
import { getAPI} from '../components/fetchAPI.js';
import CheckLogin from '../components/checkLogin.js';
import EmptyInstruments from '../components/emptyInstruments'

function Home({cours, students}){
    // Attendre que les cours soient chargés    
    if (cours.length > 0) {
        cours.map((lesson, index) => {
            //Trie les séances par date
            lesson.seances = lesson.seances.sort(function(a, b){
                let dateA = new Date(a.startAt).getTime();
                let dateB = new Date(b.startAt).getTime();
                if (dateA > dateB) {
                    return -1;
                }
            });
    
        });

        //Trie les cours par date de la prochaine scéance
        cours = cours.sort(function(a, b){
            if(a.seances.length == 0){
                return 1;
            }
            if(b.seances.length == 0){
                return -1;
            }
            let dateA = new Date(a.seances[0].startAt).getTime();
            let dateB = new Date(b.seances[0].startAt).getTime();
            if (dateA > dateB) {
                return -1;
            }
        });
    }
    
    const [filteredData, setFilteredData] = useState([]);
    //Permet d'afficher les élèves sans recherche
    useEffect(() => {
        setFilteredData(students);
    }, [students]);
    const [searchTerm, setSearchTerm] = useState('');

    //Gere la recherche
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        const filteredResults = students.filter((item) =>
          item.User.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.User.nom.toLowerCase().includes(searchTerm.toLowerCase())
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
        return cours.filter(lesson => lesson.Student.User.id === id);
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
    
    //Après le rendu des div d'exercices, masque les div vides
    useEffect(() => {
        clearExercices();
    }, [filteredData]);

    //Passer de la liste d'éleves au prochain cours
    function switchList(){
        let prochainCours = document.querySelector('.prochainCours');
        let listeEleves = document.querySelector('.listeEleves');
        let button = document.querySelector('.TeacherHome > div:first-of-type > button');
        if(prochainCours.style.display == "none"){
            prochainCours.style.display = "block";
            listeEleves.style.display = "none";
            button.innerHTML = "Voir liste élèves";
        }
        else {
            prochainCours.style.display = "none";
            listeEleves.style.display = "block";
            button.innerHTML = "Voir prochains cours";
        }
    }


    return(
        
        <div className="content TeacherHome">
            <h1>Mes élèves</h1>
            <div>
                <SearchBar onSearch={handleSearch} />
                <button onClick={switchList}>Liste d'élèves</button>
            </div>
            {filteredData.map((student, index) => {
                student = student.User;

                //Retourne les cours de l'élève avec le prof
                let lessons = getLessonsByStudentId(student.id);
                return(
                    <>
                    <div className='prochainCours'>
                        {lessons.map((lesson, index) => { 
                            //Si l'élève n'a pas de séance prévue n'affiche pas
                            if(lesson.seances.length == 0){
                                return null;
                            }
                            else {
                                return(
                                    <Link key={lesson.seances[0].id} to={`../teacher/teacherLessons/${lesson.id}/${lesson.seances[0].id}`}>
                                        <GreyDiv
                                            content={
                                            <div id={lesson.id}>
                                                <div className='lessonHeader'>
                                                    <img src="../logo/icons/avatar.png" alt={`${student.prenom} ${student.nom}`}/>
                                                    <div>
                                                        <h2>{`${student.prenom} ${student.nom}`}</h2>
                                                        <h2 className="greyText">{`${lesson.Instrument.Name} ${lesson.difficulty}`}</h2>
                                                    </div>   
                                                </div>
                                                <p>{lesson.desc}</p>
                                                <div className='nextLesson'>
                                                    <p>Prochain cours :</p>
                                                    <div>{formatDate(new Date(lesson.seances[0].startAt))}</div>
                                                </div>
                                                <div className='exercices'>
                                                    <p>Exercices</p>
                                                    <div >
                                                        {lesson.seances[0] && lesson.seances[0].activities.length > 0 ? lesson.seances[0].activities.map((activity, index) => (
                                                            <span className={`${activity.status}`}></span>
                                                        )) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                        /> 
                                    </Link> 
                                )
                            }
                        })}
                    </div>
                    <div className='listeEleves'>
                        {lessons.map((lesson, index) => { 
                            return(
                                <Link  to={`../teacher/teacherLessons/${lesson.id}`} key={index}>
                                    <GreyDiv
                                        content={
                                        <div id={student.id}>
                                            <div className='lessonHeader'>
                                                <img src="/logo/icons/avatar.png" alt={`${student.prenom} ${student.nom}`}/>
                                                <div>
                                                    <h2>{`${student.prenom} ${student.nom}`}</h2>
                                                    <h2 className="greyText">{`${lesson.Instrument.Name} ${lesson.difficulty}`}</h2>
                                                </div>   
                                            </div>
                                        </div>
                                        }
                                    /> 
                                </Link>
                            
                            )
                        })}
                    </div>
                    </>
                )
            })}
        </div> 
    )
}



 


export default function TeacherHome(){
    const [cours, setCours] = useState([]);
    const token = localStorage.getItem('token');
    CheckLogin();

    useEffect(() => {
        const fetchData = async () => {
            await getAPI('cours', setCours);
        };
        fetchData();
    }, [token]);

    const students = [];
    if (cours.length > 0){
        cours.map((lesson, index) => {
            //si lesson.Student.id est différent des autres Student.id
            if(!students.some(student => student.id === lesson.Student.id)){
                students.push(lesson.Student);
            }
        });
    }

    const [instrumentUser, setInstrumentUser] = useState(['test']);
    const [instrument, setInstrument] = useState([]);
    
    useEffect(() => {
        const fetchInst = async () => {
            await getAPI('user-instruments', setInstrumentUser);
        };
        fetchInst();

    }, []);

    useEffect(() => {
        const fetchInstruments = async () => {
            await getAPI('instruments', setInstrument);
        };
        if(instrumentUser.length == 0){
            let overlay = document.querySelector('.overlay');
            overlay.style.display = 'block';
            fetchInstruments();
        }
        
    }, [instrumentUser]);
    
    return (
        <>
        <EmptyInstruments instrument={instrument}/>
        {cours.length > 0 && students.length > 0 ? 
        <Home cours={cours} students={students}/> :
        <p className='emptyCourseTeach'>Pas de cours disponible</p>}
        </>
        
    );

    
};