import React, { useState, useEffect } from 'react';
import './CoursPage.css';
import SimpleHeader from '../components/simpleHeader.js';
import { useParams } from 'react-router-dom'
import CheckLogin from '../components/checkLogin.js';
import { getAPI} from '../components/fetchAPI.js';

function Cours(){
    CheckLogin();

    const {coursId} = useParams();
    const [cours, setCours] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getAPI('cours-app/'+coursId, setCours);
        };
        fetchData();
    }, []);
    
    return (
        cours.length != 0 ? 
        <div className="simpleContent">
            <SimpleHeader route={"/cours"} />
            <div id="CoursPage">
                <h2>{cours.Title} <span className="greyText"> · {cours.Instrument.Name} {cours.Difficulty}</span></h2>
                <p className='boldText'>{cours.description}</p>
                <p>{cours.content}</p>
            </div>
        </div>
        : null
    )
}


export default function CoursPage(){
    return (
    <Cours/>
    );
};