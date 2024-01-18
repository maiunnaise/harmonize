import React from 'react';
import { useParams } from "react-router-dom";
import Partition from '../components/Partition';
import GreyDiv from '../components/GreyDiv';
import './activity.css';
import HistoryButton from '../components/HistoryButton';
import SimpleHeader from '../components/simpleHeader';
import { Link } from 'react-router-dom';
import CheckLogin from '../components/checkLogin';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAPI } from '../components/fetchAPI';


function Activity(){
    CheckLogin();
    let { idCourse, idAct } = useParams();

    const [activities, setActivities] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getAPI(`cours/${idCourse}/activities/${idAct}`, setActivities);

        };

        fetchData();
    }, []);

    return(
        <>
        <div className="simpleContent Activity">
            <SimpleHeader/>
            <h1>Exercice</h1>
            {activities!=[] ? <ActivityTotal activity={activities}/> : <p>Chargement...</p>}
            <HistoryButton buttonText="Historique d'activités" idCourse={idCourse}/>
        </div>
        </>


    )
}

function ActivityDesc({activity}){

    const [partition, setPartition] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            if (activity && activity.Sheet ){
                await getAPI(`sheets/${activity.Sheet.id}`, setPartition);
            }
            
        };

        fetchData();
    }, [activity]);

    return(
        <div className="activityDesc">
            <h2>{activity.title}</h2>
            {/* <p>pour le {activity.dueAt}</p> */}
            {partition && partition.id ?
                <Partition partition={partition}/>
            : null}
            <p>{activity.content}</p>
            {activity.Sheet && activity.Sheet.id ?
                <Link to={`/play/${activity.Sheet.id}`}>
                    <button>Jouer</button>
                </Link>
            : null}
        </div>
    )
}

function ActivityTotal({activity}){
    
    return(
        <>
        <GreyDiv content={<ActivityDesc activity={activity}/>}/>
        {/* {activity.teacher.gender =="male" ? <p className='ActTeach'>De M.   {activity.teacher.name}</p> : <p className='ActTeach'>De Mme. {activity.teacher.name}</p>} */}
        </>
    )
}

export  {Activity, ActivityTotal};