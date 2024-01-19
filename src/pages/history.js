import {ActivityTotal} from "./activity"
import './history.css'
import SimpleHeader from "../components/simpleHeader"
import CheckLogin from "../components/checkLogin"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAPI } from "../components/fetchAPI"


export default function History(){
    CheckLogin();

    let { idCourse } = useParams();

    const [activities, setActivities] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getAPI(`cours/${idCourse}/activities`, setActivities);

        };

        fetchData();
    }, []);
    return(
        <div className="History simpleContent">
            <SimpleHeader/>
            <h1>Historique d'activités pour ce cours</h1>
            {activities.map((activity,i) => {
                if (activity.status == "finished"){
                    return (
                        <>
                            <ActivityTotal activity={activity}/>
                            {i != activities.length-1 ? <div className="separator"></div> : null}
                        </>
                    );
                }
            })}
        </div>
    )
}