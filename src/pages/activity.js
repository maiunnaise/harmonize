import React from 'react';
import { useParams } from "react-router-dom";
import Menu from '../components/Menu';
import Partition from '../components/Partition';
import GreyDiv from '../components/GreyDiv';
import './activity.css';
import PurpleButton from '../components/PurpleButton';
import HistoryButton from '../components/HistoryButton';

const activities ={
    id:0, name:"Jouer partition 1", dueAt:"14/12/2023", status:"toDo",
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ero",
    teacher :{
        name:"Dupont", gender:"male"
    },
    partition: {
        name : "Partition tartampion", difficulty : "Débutant", style :"Jazz", instrument : "Basse", auteur : "Mozart"
    }
}



function Activity(){

    let { id } = useParams();

    return(
        <>
        <Menu/>
        <div className="content Activity">
            <h1>Exercice</h1>
            <ActivityTotal activity={activities}/>
            <HistoryButton buttonText="Historique d'activités"/>
        </div>
        </>
        

    )
}

function ActivityDesc({activity}){
    return(
        <div className="activityDesc">
            <h2>{activity.name}</h2>
            <p>pour le {activity.dueAt}</p>
            <Partition partition={activity.partition}/>
            <p>{activity.description}</p>
            <PurpleButton buttonText="Jouer"/>
        </div>
    )
}

function ActivityTotal({activity}){
    return(
        <>
        <GreyDiv content={<ActivityDesc activity={activity}/>}/>
        {activity.teacher.gender =="male" ? <p className='ActTeach'>De M.   {activity.teacher.name}</p> : <p className='ActTeach'>De Mme. {activity.teacher.name}</p>}
        </>
    )
}

export  {Activity, ActivityTotal};