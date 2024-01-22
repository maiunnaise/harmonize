import React, { useState, useEffect } from 'react';
import './CoursPage.css';
import GreyDiv from '../components/GreyDiv.js';
import SimpleHeader from '../components/simpleHeader.js';
import { useSearchParams, useParams } from 'react-router-dom'
import CheckLogin from '../components/checkLogin.js';
import { getAPI, postAPI, deleteAPI, putAPI} from '../components/fetchAPI.js';

function Cours(){
    CheckLogin();

    const [queryParameters] = useSearchParams()
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
            <SimpleHeader />
            <div id="CoursPage">
                <h2>{cours.Title} <span className="greyText"> · {cours.Instrument.Name} {cours.Difficulty}</span></h2>
                <p className='boldText'>{cours.description}</p>
                <p>{cours.content}</p>
            </div>
        </div>
        : null
    )
}

// let coursData = [{id: 5, titre: "Les notes", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
// category: "Solfège", img: "/img/cours-image.jpg",
// content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
// {id: 3, titre: "Les accords", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
// category: "Solfège", img: "/img/cours-image.jpg",
// content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
// {id: 2, titre: "Les notes", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
// category: "Piano", img: "/img/cours-image.jpg",
// content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}]

export default function CoursPage(){
    return (
    <Cours/>
    );
};